import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { jwtDecode } from "jwt-decode";

// import { actionCreators } from "./store";
// import {
//   clearStorage,
//   getRefreshToken,
//   getToken,
//   saveTokenInfos,
// } from "../features/auth/auth.service";

// import { type LoginResponse } from "@/types/Api";

// type JwtData = {
//   "user.id": string;
//   "user.email": string;
//   "user.role": string;
//   exp: number;
// };

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    // JWT
    // const token = getToken();
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }

    // default headers
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

// const baseQueryWithReAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const token = getToken();

//   if (token) {
//     const tokenDecoded = jwtDecode<JwtData>(token);

//     const expiredDate = new Date(tokenDecoded.exp * 1000);
//     const expiredSoon = add(new Date(), { minutes: 1 }) > expiredDate;
//     if (expiredSoon) {
//       const refreshToken = getRefreshToken();
//       const refreshRequest: FetchArgs = {
//         method: "POST",
//         url: "api/auth/refresh-token",
//         body: {
//           refreshToken,
//         },
//       };

//       const refreshResult = await baseQuery(refreshRequest, api, extraOptions);

//       if (refreshResult.error) {
//         api.dispatch({ type: "auth/setConnectedUser", payload: false });
//         clearStorage();
//       } else if (refreshResult.data) {
//         saveTokenInfos(refreshResult.data as LoginResponse);
//       }
//     }
//   } else {
//     console.log("FCU pas de token");
//   }
//   return await baseQuery(args, api, extraOptions);
// };

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["MATCHS", "PLAYERS"],
  endpoints: () => ({}),
});
