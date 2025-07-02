import { createEntityAdapter } from "@reduxjs/toolkit";
import { z } from "zod";

import { type MatchResponse } from "@/types/TalanCupApi";
export type Match = MatchResponse;

export const matchsAdapter = createEntityAdapter({
  selectId: (match: Match) => match.matchId,
  sortComparer: (a, b) => (a.startDate > b.startDate ? 1 : -1),
});

export const matchsInitialState = matchsAdapter.getInitialState();

export const useMatchSchema = () => {
  return z.object({
    awayPlayer: z.string().nonempty("Joueur 2 est requis"),
  });
};

export type MatchSchema = z.infer<ReturnType<typeof useMatchSchema>>;
