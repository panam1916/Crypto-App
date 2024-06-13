/*import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@mui/material';
import {useHistory} from 'react-router-dom';
import { Cryptostate } from '../CryptoContext';


const useStyles=makeStyles(()=>({
    title:{
        flex:1,
        color:'gold',
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));
const Header=()=>{
    const classes=useStyles();
    const history=useHistory();
    const {currency,setCurrency}=Cryptostate
    const darktheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });
    return (
        <div>
            <ThemeProvider theme={darktheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                <Toolbar>
                    <Typography onClick={()=>{history.push("/")}} className={classes.title} variant="h6">Crypto Hunter</Typography>
                    <Select variant='outlined'
                    style={{
                        width:100,
                        height:40,
                        marginRight:15,
                    }}
                    value={currency}
                    onChange={(e)=>{setCurrency(e.target.value)}}
                    >
                        <MenuItem value={"USD"}>INR</MenuItem>
                        <MenuItem value={"INR"}>USD</MenuItem>
                    </Select>
                </Toolbar>
                </Container>
            </AppBar>
            </ThemeProvider>
        </div>
    );
}

export default Header; */
import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Title = styled(Typography)({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Title onClick={() => navigate("/")} variant="h6">Crypto Hunter</Title>
            <Select
              variant='outlined'
              sx={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={handleChange}
            >
              <MenuItem value={"USD"}>INR</MenuItem>
              <MenuItem value={"INR"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
