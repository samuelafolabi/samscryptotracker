import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Image,
  Text,
  Spinner,
  Flex,
  Center,
  Stat,
  StatArrow,
  Box,
} from "@chakra-ui/react";
import { CoinState } from "../CoinContext";
import { SingleCoin } from "../config/api";
import parse from "html-react-parser";

import Coindetails from "../components/Coindetails";

export default function Coinpage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CoinState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  console.log("coinpage", coin);
  console.log("id", id);
  useEffect(() => {
    fetchCoin();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (!coin)
    return (
      <Center>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="x5"
        />
      </Center>
    );
  let profit = coin.market_data.price_change_percentage_24h >= 0;
  return (
    <div>
      <Box px={{ base: "0px", md: "0px", lg: "0px", xl: "0", "2xl": "20vw" }}>
        <Flex
          marginLeft={{ base: "10px", md: "20px", lg: "20px" }}
          marginBottom={2}
        >
          <Image
            marginRight={4}
            src={coin?.image.large}
            alt={coin?.name}
            style={{ height: "5rem", padding: "2px" }}
          />
          <Center>
            <Text fontSize="4xl">{coin?.name.toUpperCase()}</Text>
          </Center>
        </Flex>
        <Text
          fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}
          marginLeft={{ base: "10px", md: "20px", lg: "20px" }}
          marginBottom={{ base: "10px", md: "10px", lg: "10px" }}
        >
          {parse(coin?.description.en.split(". ")[0])}
          {". "}
          {parse(coin?.description.en.split(". ")[1])} {"."}
        </Text>
        <Flex marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
          <Text
            color={profit ? "green" : "red"}
            fontSize={{ base: "3xl", md: "3xl", lg: "3xl" }}
            marginRight={5}
          >
            {/* Price:  */}
            {symbol} {""}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </Text>
          <Center>
            <Stat>
              <StatArrow type={profit ? "increase" : "decrease"} />
              {profit && "+"}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </Stat>
          </Center>
        </Flex>

        <Text
          fontSize="2xl"
          marginLeft={{ base: "10px", md: "20px", lg: "20px" }}
        >
          Market Rank: {coin?.market_cap_rank}
        </Text>
        <Text
          fontSize="2xl"
          marginLeft={{ base: "10px", md: "20px", lg: "20px" }}
          marginBottom={{ base: "10px", md: "10px", lg: "10px" }}
        >
          Market Cap: {symbol} {""}{" "}
          {numberWithCommas(
            coin?.market_data.market_cap[currency.toLowerCase()]
          )}
        </Text>
        <Coindetails coin={coin} />
      </Box>
    </div>
  );
}
