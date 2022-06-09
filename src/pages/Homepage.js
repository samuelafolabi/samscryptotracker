import { Box } from "@chakra-ui/react";
import React from "react";
import Carousel from "../components/Carousel";
import Coinstable from "../components/Coinstable";

export default function Homepage() {
  return (
    <>
      <Carousel />
      <Box px={{ base: "0px", md: "0px", lg: "0px", xl: "0", "2xl": "20vw" }}>
        <Coinstable />
      </Box>
    </>
  );
}
