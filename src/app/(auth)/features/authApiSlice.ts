import { setAuthCookies } from '@/lib';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { setProfileInfo } from '@/redux/features/common/userSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Check if user is admin

          //set user
          dispatch(setProfileInfo(data.user));
          // Set cookies after successful login
          setAuthCookies({
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
          });
        } catch (error) {
          console.warn('Login failed:', error);
        }
      },
    }),

    // signUp
    signUp: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //set user
          dispatch(setProfileInfo(data.user));
          // Set cookies after successful login
          setAuthCookies({
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
          });
        } catch (error) {
          console.warn('Sign up failed:', error);
        }
      },
    }),

  }),
  overrideExisting: true,
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
