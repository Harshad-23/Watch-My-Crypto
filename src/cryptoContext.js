import { createContext, useContext, useEffect, useState } from "react";
import { currencies } from "./config/data";

const crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    setSymbol(currencies.find((curr) => curr.name === currency).symbol);
  }, [currency]);

  return (
    <crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto);
};
