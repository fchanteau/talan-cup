import { api } from "@/common/api";
import { type PlayerResponse } from "@/types/TalanCupApi";

export const playersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<PlayerResponse[], void>({
      query: () => ({
        url: "api/players",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlayersQuery } = playersApi;
