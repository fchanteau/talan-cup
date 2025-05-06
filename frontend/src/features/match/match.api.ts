import { type EntityState } from "@reduxjs/toolkit";

import { matchsAdapter, matchsInitialState, type Match } from "./match.model";

import { api } from "@/common/api";
import { type AddMatchRequest, type MatchResponse } from "@/types/TalanCupApi";

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
      providesTags: ["MATCHS"],
    }),
    addMatch: build.mutation<void, AddMatchRequest>({
      query: (body) => ({
        url: "api/matchs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MATCHS"],
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     matchApi.util.updateQueryData("getMatchs", undefined, (draft) => {
      //       matchsAdapter.addOne(draft, arg);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
    deleteMatch: build.mutation<void, string>({
      query: (id) => ({
        url: `api/matchs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MATCHS"],
    }),
  }),
});

export const {
  useGetMatchsQuery,
  useAddMatchMutation,
  useDeleteMatchMutation,
} = matchApi;
