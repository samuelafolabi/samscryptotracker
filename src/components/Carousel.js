import axios from "axios";
import React, { useState, useEffect } from "react";
import { VStack, Heading, Center } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

import { CoinState } from "../CoinContext";
import { TrendingCoins } from "../config/api";

export default function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CoinState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <>
        <img
          src={coin.image}
          alt={coin.name}
          style={{ height: "8rem", padding: "10px" }}
        />
        {/* <span>
          {coin.symbol}
          <span>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <span>
            {symbol}
            {numberWithCommas(coin?.current_price?.toFixed(2))}
          </span> */}
        <Stat>
          <StatLabel>{coin.symbol.toUpperCase()}</StatLabel>
          <StatNumber color={profit ? "green" : "red"}>
            {symbol}
            {numberWithCommas(coin?.current_price?.toFixed(2))}
          </StatNumber>
          <StatHelpText>
            <StatArrow type={profit ? "increase" : "decrease"} />
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </StatHelpText>
        </Stat>
      </>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    400: {
      items: 3,
    },
    500: {
      items: 4,
    },
    800: {
      items: 6,
    },
    2400: {
      items: 8,
    },
  };
  return (
    <div>
      <VStack>
        <Heading
          bgGradient="linear(to-r, pink.500, blue.500)"
          bgClip="text"
          fontWeight="extrabold"
          size="xl"
          mb="8"
          mt="8"
        >
          Trending Now
        </Heading>
      </VStack>
      <Center>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
          paddingLeft={10}
          paddingRight={0}
        />
      </Center>
    </div>
  );
}
