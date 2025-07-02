import { add } from "date-fns";
import { jwtDecode } from "jwt-decode";

import { unixTimeToDate } from "@/common/utils/date";

export const setToken = (token: string): void => {
  sessionStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const isTokenInStorageAndValid = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }

  const tokenDecoded = jwtDecode<{ exp: number }>(token);

  const expiredDate = unixTimeToDate(tokenDecoded.exp); //) new Date(tokenDecoded.exp * 1000);
  const result = add(new Date(), { minutes: 5 }) < expiredDate;
  if (!result) {
    clearStorage();
  }
  return result;
};

export const clearStorage = (): void => sessionStorage.clear();

export const getUserIdFromToken = (): string | undefined => {
  const token = getToken();
  if (!token) {
    return undefined;
  }
  const tokenDecoded = jwtDecode<{ "player.id": string }>(token);

  return tokenDecoded["player.id"];
};
