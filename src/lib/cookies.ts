import Cookies from 'js-cookie';

interface TokenOptions {
  accessToken: string;
  refreshToken: string;
  user?: string;
  accessTokenExpiry?: number; // in seconds
  refreshTokenExpiry?: number; // in seconds
}

export const setAuthCookies = (options: TokenOptions) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  } as const;

  // Set access token cookie
  Cookies.set('access_token', options.accessToken, {
    ...cookieOptions,
    expires: new Date(
      Date.now() + (options.accessTokenExpiry || 15 * 60) * 1000
    ),
  });

  // Set refresh token cookie
  Cookies.set('refresh_token', options.refreshToken, {
    ...cookieOptions,
    expires: new Date(
      Date.now() + (options.refreshTokenExpiry || 7 * 24 * 60 * 60) * 1000
    ),
  });

  //set user cookie
  if (options.user) {
    Cookies.set('user', options.user, {
      ...cookieOptions,
    });
  }
};

export const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export const getTokens = () => {
  return {
    accessToken: Cookies.get('access_token'),
    refreshToken: Cookies.get('refresh_token'),
  };
};
