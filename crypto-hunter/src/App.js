import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { styled } from '@mui/system';
import Alert from "./components/Alert";

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
      <Alert />
    </BrowserRouter>
  );
}

export default App; 

