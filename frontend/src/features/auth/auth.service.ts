import { jwtDecode } from "jwt-decode";

export const setToken = (token: string): void => {
  sessionStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const isTokenInStorage = (): boolean => {
  return getToken() !== null;
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
