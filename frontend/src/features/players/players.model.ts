import { createEntityAdapter } from "@reduxjs/toolkit";

import { type PlayerResponse } from "@/types/TalanCupApi";

export type Player = PlayerResponse;

export const playersAdapter = createEntityAdapter({
  selectId: (player: Player) => player.playerId,
  sortComparer: (a, b) => a.firstname.localeCompare(b.firstname),
});

export const playersInitialState = playersAdapter.getInitialState();
