import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { toaster } from "@/components/chakra/toaster";

type ErrorModel = {
  detail: string;
  extensions: unknown;
  instance: string;
  status: number;
  title: string;
  type: string;
};

export function useToasterHandleError() {
  // Return the handler function directly
  return (error: FetchBaseQueryError | SerializedError) => {
    console.log(error);
    let title: string = "Error";
    let message: string;

    if ("status" in error) {
      // Handle FetchBaseQueryError
      if (error.status === "FETCH_ERROR") {
        console.error(error);
        message =
          "Oops! Something bad happened. Contact admin if the problem persists.";
      } else if (error.status === 401) {
        title = "Unauthorized";
        message =
          "You are not authorized to perform this action or your token is expired. Please login again.";
      } else {
        // Try to get message from the error data
        const errorModel = error.data as ErrorModel;
        title = errorModel?.title || "Error";
        message = errorModel?.detail || "An unknown error occurred";
      }
    } else {
      // Handle SerializedError
      message =
        error.message || "An unknown error occurred. Try logout and login.";
    }

    toaster.create({
      title: title,
      description: message,
      type: "error",
    });
  };
}
