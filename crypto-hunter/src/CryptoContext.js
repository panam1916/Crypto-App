/*import React, { Children, createContext, useContext, useState, useEffect } from 'react';

const Crypto=createContext();
const CryptoContext=({chlidren})=>{
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
  
    useEffect(() => {
      if (currency === "INR") setSymbol("₹");
      else if (currency === "USD") setSymbol("$");
    }, [currency]);
  
    return (
        <Crypto.Provider value={{currency,symbol,setCurrency}}>
                {Children}
        </Crypto.Provider>
    );
}

export default CryptoContext;

export const Cryptostate=()=>{
    return useContext(Crypto);
} */
    import React, { Children, createContext, useContext, useState, useEffect } from 'react';

    const Crypto = createContext();
    
    const CryptoContext = ({ children }) => {
        const [currency, setCurrency] = useState("INR");
        const [symbol, setSymbol] = useState("₹");
      
        useEffect(() => {
          if (currency === "INR") setSymbol("₹");
          else if (currency === "USD") setSymbol("$");
        }, [currency]);
      
        return (
            <Crypto.Provider value={{ currency, symbol, setCurrency }}>
                {children}
            </Crypto.Provider>
        );
    }
    
    export default CryptoContext;
    
    export const CryptoState = () => {
        return useContext(Crypto);
    }
    