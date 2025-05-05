// import {
//   Button,
//   CloseButton,
//   Dialog,
//   Portal,
//   type DialogRootProps,
// } from "@chakra-ui/react";
// import React, { createContext, useContext } from "react";
// import { useRef } from "react";

// // Create a context to pass the ref
// // const DialogContentRefContext =
// //   createContext<React.RefObject<HTMLDivElement> | null>(null);

// // // Export a hook to access the ref in child components
// // export const useDialogContentRef = () => useContext(DialogContentRefContext);

// export type DialogContainerProps = DialogRootProps & {
//   onSuccess?: () => void;
//   label: string;
//   labelSuccess?: string;
//   labelClose?: string;
//   children?: React.ReactNode;
//   showFooter: boolean;
// };

// export function DialogContainer(props: DialogContainerProps) {
//   const contentRef = useRef<HTMLDivElement>(null);

//   return (
//     <Dialog.Root {...props}>
//       <Portal>
//         <Dialog.Backdrop />
//         <Dialog.Positioner>
//           <Dialog.Content ref={contentRef}>
//             <Dialog.Header>
//               <Dialog.Title>{props.label}</Dialog.Title>
//             </Dialog.Header>
//             <DialogContentRefContext.Provider
//               value={contentRef as React.RefObject<HTMLDivElement>}
//             >
//               <Dialog.Body>{props.children}</Dialog.Body>
//             </DialogContentRefContext.Provider>
//             {props.showFooter && (
//               <Dialog.Footer>
//                 <Dialog.ActionTrigger asChild>
//                   <Button variant="outline">{props.labelClose}</Button>
//                 </Dialog.ActionTrigger>
//                 <Button onClick={props.onSuccess}>{props.labelSuccess}</Button>
//               </Dialog.Footer>
//             )}
//             <Dialog.CloseTrigger asChild>
//               <CloseButton size="sm" />
//             </Dialog.CloseTrigger>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Portal>
//     </Dialog.Root>
//   );
// }
