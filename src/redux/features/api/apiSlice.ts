import { getTokens, setAuthCookies } from '@/lib';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout } from '../common/userSlice';

const mutex = new Mutex();

export const apiEndpoint =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_BACKEND_LOCAL_API_URL
    : process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: apiEndpoint,
  prepareHeaders: async (headers) => {
    const tokens = getTokens();
    if (tokens.accessToken) {
      headers.set('authorization', `Bearer ${tokens.accessToken}`);
    }
    return headers;
  },
  // credentials: 'include', // Important for cookies
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error && result.error.status === 401) ||
    (result.error && result.error.status === 403)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const tokens = getTokens();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshResult: any = await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken: tokens.refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Update cookies with new tokens
          setAuthCookies({
            accessToken: refreshResult.data.accessToken,
            refreshToken: refreshResult.data.refreshToken,
          });

          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Clear cookies on refresh failure
          // api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ['Product', 'SingleProduct', 'Order', 'Files'],
});
