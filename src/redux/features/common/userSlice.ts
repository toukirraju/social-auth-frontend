import { clearAuthCookies } from '@/lib';
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  profile: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileInfo: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = undefined;
      clearAuthCookies();
      window.location.href = '/auth';
    },
  },
  selectors: {
    profileInfo: (state) => state.profile,
  },
});

export const { setProfileInfo, logout } = userSlice.actions;
export const { profileInfo } = userSlice.selectors;
export default userSlice.reducer;
