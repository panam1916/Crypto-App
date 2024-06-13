/*import React from 'react';
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
    banner: {
      backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
  }));

function Banner(){
const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
    );
}

export default Banner; */
import React from 'react';
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import { styled } from '@mui/system'; // Step 1: Import styled

const BannerContainer = styled('div')(({ theme }) => ({ // Step 2: Use styled to create BannerContainer
  backgroundImage: "url(./banner2.jpg)",
}));

const BannerContent = styled(Container)(({ theme }) => ({ // Step 2: Use styled to create BannerContent
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
}));

const Tagline = styled('div')(({ theme }) => ({ // Step 2: Use styled to create Tagline
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat" }} // Step 3: Use sx prop for styles
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat" }} // Step 3: Use sx prop for styles
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel />
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
