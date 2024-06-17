/*import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage=()=>{

        const {id}=useParams();
        const [coin,setCoin]=useState();

        const {currency,symbol}=CryptoState();

        const fetchCoin=async()=>{
            const {data}= await axios.get(SingleCoin(id));
            setCoin(data);
        }

        useEffect(()=>{
            fetchCoin();
        },[]);

        const useStyles = makeStyles((theme) => ({
            container: {
              display: "flex",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
              },
            },
            sidebar: {
              width: "30%",
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 25,
              borderRight: "2px solid grey",
            },
            heading: {
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            },
            description: {
              width: "100%",
              fontFamily: "Montserrat",
              padding: 25,
              paddingBottom: 15,
              paddingTop: 0,
              textAlign: "justify",
            },
            marketData: {
              alignSelf: "start",
              padding: 25,
              paddingTop: 10,
              width: "100%",
              [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
              },
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
              },
              [theme.breakpoints.down("xs")]: {
                alignItems: "start",
              },
            },
          }));
        
          const classes = useStyles();
        
          if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
    );
}

export default CoinPage; */
import { LinearProgress, Typography ,Button} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import CoinInfo from "../components/CoinInfo.js";
import { SingleCoin } from "../config/api.js";
import { numberWithCommas } from "../components/CoinsTable.js";
import { CryptoState } from "../CryptoContext.js";
import { styled } from '@mui/system';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled('div')(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
}));

const Description = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
}));

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const WatchlistButton = styled(Button)(({ theme, inWatchlist }) => ({
  width: "100%",
  height: 40,
  backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
}));



const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol,user,watchlist,setAlert } = CryptoState();

  const fetchCoin = useCallback(async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  }, [id]);
  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);


  const inWatchlist=watchlist.includes(coin?.id);
  const addToWatchlist=async () =>{
    const coinRef=doc(db,"watchlist",user.uid);
    try {
      await setDoc(coinRef,
        {coins:watchlist?[...watchlist,coin?.id]:[coin?.id]},{merge:true})
        setAlert({
          open: true,
          message: `${coin.name} Added from the Watchlist!`,
          type: "success",
        });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }

  }
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
 
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">
          {coin?.name}
        </Heading>
        <Description variant="subtitle1">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Description>
        
        <span style={{ display: "flex" }}>
          <Heading variant="h5">
            Rank:
          </Heading>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {numberWithCommas(coin?.market_cap_rank)}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Heading variant="h5">
            Current Price:
          </Heading>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Heading variant="h5">
            Market Cap:
          </Heading>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M
          </Typography>
        </span>
        {user&&(
            <WatchlistButton
            variant="outlined"
            inWatchlist={inWatchlist ? 1 : 0}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </WatchlistButton>
        )}
      </Sidebar>
      {coin && <CoinInfo coin={coin} />}
    </Container>
  );
}

export default CoinPage;
