import {
  ChakraProvider,
  createSystem,
  defineConfig,
  defaultConfig,
} from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./common/store.ts";

import "./index.css";

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: "teal", //default is gray
    },
  },
});
const system = createSystem(defaultConfig, customConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
