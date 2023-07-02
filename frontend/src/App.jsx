import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Root, Search } from "./pages";

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "black",
            borderColor: "black",
          }
        }
      }
    }
  }
})

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
