import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AuthState } from "./auth.model";
import { getUserIdFromToken, isTokenInStorageAndValid } from "./auth.service";

export const initialState: AuthState = {
  isConnected: isTokenInStorageAndValid(),
  playerId: getUserIdFromToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      state.isConnected = true;
      state.playerId = payload;
    },
    logout: (state) => {
      state.isConnected = false;
      state.playerId = undefined;
    },
  },
});
