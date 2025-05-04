import { type EntityState } from "@reduxjs/toolkit";

import { type Player, playersAdapter, playersInitialState } from "./players.model";

import { api } from "@/common/api";
import { type PlayerResponse } from "@/types/TalanCupApi";

export const playersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<EntityState<Player, string>, void>({
      query: () => ({
        url: "api/players",
        method: "GET",
      }),
      transformResponse: (response: PlayerResponse[]) => {
        return playersAdapter.setAll(playersInitialState, response);
      },
      providesTags: ["PLAYERS"]
    }),
  }),
});

export const { useGetPlayersQuery } = playersApi;
