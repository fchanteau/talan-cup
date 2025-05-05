import { Flex } from "@chakra-ui/react";

import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Flex
      direction="column"
      minHeight="100vh" // Make the layout at least full viewport height
    >
      <Navbar />
      <Flex flex="1">
        {/* This will grow to fill available space */}
        {/* <Outlet /> */}
        <MainPage />
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
