import { type EntityState } from "@reduxjs/toolkit";

import { matchsAdapter, matchsInitialState, type Match } from "./match.model";

import { api } from "@/common/api";
import { type MatchResponse } from "@/types/TalanCupApi";

export const matchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMatchs: build.query<EntityState<Match, string>, void>({
      query: () => ({
        url: "api/matchs",
        method: "GET",
      }),
      transformResponse: (response: MatchResponse[]) => {
        return matchsAdapter.setAll(matchsInitialState, response);
      },
    }),
  }),
});

export const { useGetMatchsQuery } = matchApi;
