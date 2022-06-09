import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { CoinState } from "../CoinContext";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";

function Coindetails({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setdays] = useState(1);
  const { currency } = CoinState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  console.log(`data`, historicalData);
  console.log(`coinhistory`, coin);
  useEffect(() => {
    fetchHistoricalData();
  }, [days, currency]);
  let profit = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div>
      {!historicalData ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Day ) in ${currency}`,
                  backgroundColor: `${profit ? "green" : "red"}`,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Coindetails;
