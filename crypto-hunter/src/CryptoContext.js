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
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

    const Crypto = createContext();
    
    const CryptoContext = ({ children }) => {
        const [currency, setCurrency] = useState("INR");
        const [symbol, setSymbol] = useState("₹");
        const [coins, setCoins] = useState([]);
        const [loading, setLoading] = useState(false);
        const [user,setUser]=useState(null);
        const [alert,setAlert]=useState({
            open:false,
            message:"",
            type:"success"
        });
        const [watchlist,setWatchlist]=useState([]);

        useEffect(()=>{
            if(user)
                {
                    const coinRef = doc(db,"watchlist",user.uid);
                
               var unsubcribe = onSnapshot( coinRef , coin=>{
                    if(coin.exists())
                    {
                        console.log(coin.data().coins);
                        setWatchlist(coin.data().coins);
                    }else
                    {
                        console.log("NO items in list");
                    }
                });
                return()=>{
                    unsubcribe();
                };
            }
        },[user]);

        const fetchCoins = async () => {
            try{
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));
            console.log(data);
        
            setCoins(data);
            setLoading(false);
            }
            catch(error)
            {
              console.error('Error fetching coins:', error);
            }
          };

          useEffect(()=>{
            onAuthStateChanged(auth,user=>{
                if(user) setUser(user);
                else setUser(null);
            })
          },[]);
        
      
        useEffect(() => {
          if (currency === "INR") setSymbol("₹");
          else if (currency === "USD") setSymbol("$");
        }, [currency]);


        useEffect(() => {
        fetchCoins();
        }, [currency]);

      
        return (
            <Crypto.Provider value={{ currency, symbol, setCurrency,coins,loading,fetchCoins ,alert,setAlert,user,watchlist}}>
                {children}
            </Crypto.Provider>
        );
    }
    
    export default CryptoContext;
    
    export const CryptoState = () => {
        return useContext(Crypto);
    }
    