import { createContext, useContext } from "react";

// Create a context to pass the ref
export const DialogContentRefContext = createContext<
  React.RefObject<HTMLElement> | undefined
>(undefined);

// Export a hook to access the ref in child components
export const useDialogContentRef = () => useContext(DialogContentRefContext);
