import React from "react";
import { Heading } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Select, Stack } from "@chakra-ui/react";
import { CoinState } from "../CoinContext";

export default function Header() {
  const { currency, setCurrency } = CoinState();
  console.log("currency", currency);
  return (
    <div>
      <VStack p={4}>
        <Heading
          bgGradient="linear(to-r, pink.500, blue.500)"
          bgClip="text"
          fontWeight="extrabold"
          size="2xl"
          mb="8"
          mt="8"
        >
          Sam's CoinTracker
        </Heading>
        {/* Selecting currency */}
        <Stack>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            size="lg"
            variant="filled"
            mb="8"
          >
            <option value="USD" size="lg">
              USD
            </option>
            <option value="GBP" size="lg">
              GBP
            </option>
            <option value="NGN" size="lg">
              NGN
            </option>
            <option value="EUR" size="lg">
              EUR
            </option>
          </Select>
        </Stack>

        {/* Selecting currency */}
      </VStack>
    </div>
  );
}
