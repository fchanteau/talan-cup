import { type AppState } from "@/common/store";

export const isConnected = (state: AppState) => state.auth.isConnected;

export const selectConnectedPlayerId = (state: AppState) => state.auth.playerId;
