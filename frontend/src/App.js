import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Search } from "./pages";

import "./App.css";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
