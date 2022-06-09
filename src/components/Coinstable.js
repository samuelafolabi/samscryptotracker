import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  VStack,
  Stack,
  Input,
  Center,
  HStack,
  Container,
  Flex,
  color,
} from "@chakra-ui/react";

import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  StatArrow,
  TableContainer,
} from "@chakra-ui/react";

import { CoinState } from "../CoinContext";
import axios from "axios";
import { CoinList } from "../config/api";

export default function Coinstable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol } = CoinState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  console.log("coinlist", coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <VStack>
        <Heading
          bgGradient="linear(to-r, pink.500, blue.500)"
          bgClip="text"
          fontWeight="extrabold"
          size="xl"
          mb="8"
          mt="16"
        >
          Prices by Market Cap
        </Heading>
      </VStack>
      <Container width={{ base: "80vw", md: "60vw", lg: "40vw" }} mb="8">
        <Input
          variant="outline"
          placeholder="Search"
          size="lg"
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
      </Container>

      <TableContainer
      // width={{ base: "90vw", md: "90vw", lg: "100vw" }}
      >
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th fontSize={{ base: "md", md: "md", lg: "lg" }}>Coin</Th>
                <Th isNumeric fontSize={{ base: "md", md: "md", lg: "lg" }}>
                  Price
                </Th>
                <Th isNumeric fontSize={{ base: "md", md: "md", lg: "lg" }}>
                  24h Change
                </Th>
                <Th isNumeric fontSize={{ base: "md", md: "md", lg: "lg" }}>
                  Mkt Cap
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {handleSearch().map((row) => {
                const profit = row.price_change_percentage_24h >= 0;
                return (
                  <Tr
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.name}
                  >
                    <Td fontSize="lg">
                      <Flex>
                        <img
                          src={row.image}
                          alt={row.name}
                          style={{
                            height: "4rem",
                            padding: "10px",
                            paddingLeft: "0px",
                          }}
                        />
                        <Center fontSize={{ base: "lg", md: "lg", lg: "2xl" }}>
                          {row.symbol.toUpperCase()}
                        </Center>
                      </Flex>
                    </Td>
                    <Td
                      isNumeric
                      fontSize={{ base: "lg", md: "lg", lg: "2xl" }}
                      color={profit ? "green" : "red"}
                    >
                      {symbol} {""}
                      {numberWithCommas(row.current_price.toFixed(3))}
                    </Td>
                    <Td
                      isNumeric
                      fontSize={{ base: "lg", md: "lg", lg: "2xl" }}
                    >
                      <StatArrow type={profit ? "increase" : "decrease"} />
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </Td>
                    <Td
                      isNumeric
                      fontSize={{ base: "lg", md: "lg", lg: "2xl" }}
                    >
                      {symbol} {""}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0, -6)
                      )}{" "}
                      M
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}
