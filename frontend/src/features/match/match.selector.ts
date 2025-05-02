import { createSelector } from "@reduxjs/toolkit";

import { matchApi } from "./match.api";
import { matchsAdapter } from "./match.model";

import { type AppState } from "@/common/store";

const selectMatchsResult = matchApi.endpoints.getMatchs.select();

const selectMatchsData = createSelector(
  selectMatchsResult,
  (result) => result.data ?? matchsAdapter.getInitialState()
);

export const {
  selectAll: selectAllMatchs,
  selectById: selectMatchById,
  selectIds: selectMatchsIds,
} = matchsAdapter.getSelectors((state: AppState) => selectMatchsData(state));
