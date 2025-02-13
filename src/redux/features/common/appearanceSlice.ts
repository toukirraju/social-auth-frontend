import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  primaryShade: "",
  appearance: {},
};

const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setPrimaryColorShade: (state, action) => {
      state.primaryShade = action.payload;
    },
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
  },
  selectors: {
    primaryColorShade: (state) => state.primaryShade,
    appearance: (state) => state.appearance,
  },
});

export const { setPrimaryColorShade, setAppearance } = appearanceSlice.actions;
export const { primaryColorShade, appearance } = appearanceSlice.selectors;
export default appearanceSlice.reducer;
