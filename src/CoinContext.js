import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Coin = createContext();

export default function CoinContext({ children }) {
  const [currency, setCurrency] = useState("NGN");
  const [symbol, setSymbol] = useState("₦");

  useEffect(() => {
    if (currency === "NGN") setSymbol("₦");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "EUR") setSymbol("€");
  }, [currency]);
  return (
    <Coin.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Coin.Provider>
  );
}

export const CoinState = () => {
  return useContext(Coin);
};
