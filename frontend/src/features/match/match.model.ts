import { createEntityAdapter } from "@reduxjs/toolkit";

import { type MatchResponse } from "@/types/TalanCupApi";

export type Match = MatchResponse;

export const matchsAdapter = createEntityAdapter({
  selectId: (match: Match) => match.matchId,
  sortComparer: (a, b) => (a.startDate > b.startDate ? 1 : -1),
});

export const matchsInitialState = matchsAdapter.getInitialState();
