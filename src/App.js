import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import theme from "./theme/theme";
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
