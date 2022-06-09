import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts: {
    heading: `'Karla', sans-serif`,
    body: `'Karla', sans-serif`,
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
  },
});

export default theme;
