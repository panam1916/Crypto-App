/*import {BrowserRouter, Route} from "react-router-dom";
import Header from './components/Header';
import './App.css';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import {makeStyles} from '@mui/material';

const useStyles=makeStyles(()=>({
  App:{
      backgorundColor:'#14161a',
      color:'white',
      minHeight:'100vh',
  },

}));
function App() {
  const classes=useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path="/" Component={Homepage} exact/>
        <Route path="/coins/:id" Component={CoinPage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;  */
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { styled } from '@mui/system';

const AppContainer = styled('div')({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh',
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/coins/:id" element={<CoinPage/>} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App; 

