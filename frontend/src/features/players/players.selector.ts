import { createSelector } from "@reduxjs/toolkit";

import { playersApi } from "./players.api";
import { playersAdapter } from "./players.model";

import { type AppState } from "@/common/store";

const selectPlayersResult = playersApi.endpoints.getPlayers.select();

const selectPlayersData = createSelector(
    selectPlayersResult,
  (result) => result.data ?? playersAdapter.getInitialState()
);

export const {
  selectAll: selectAllPlayers,
  selectById: selectPlayerById,
  selectIds: selectPlayersIds,
} = playersAdapter.getSelectors((state: AppState) => selectPlayersData(state));
