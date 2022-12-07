import './App.css';
import { createContext,useState } from 'react';
import Signup from './pages/Signup';
import OTP from './pages/OTP';
import Signin from './pages/Signin';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Resetpassword from './pages/Resetpassword';
import Emailreset from './pages/Emailreset';
import Budget from './pages/Budget';
import CurrentBid from './pages/CurrentBid';
import ListCategories from './pages/ListCategories';
import ItemInfo from './pages/ItemInfo';
import Currency from './pages/Currency';
import Payment from './pages/Payment';
export const UserContext = createContext()
function App() {
  const [searchValue,setSearchValue] = useState('')
  return (
    <UserContext.Provider value={{searchValue,setSearchValue}}>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/otp/' element={<OTP/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/resetpassword' element={<Resetpassword/>}/>
            <Route path='/emailreset' element={<Emailreset/>}/>
            <Route path='/shoppingcart' element={<Budget/>}></Route>
            <Route path='/bid' element={<CurrentBid/>}/>
            <Route path='/categories/:cate' element={<ListCategories/>}/>
            <Route path='/item/:cateItem' element={<ItemInfo/>}/> 
            <Route path='/currency' element={<Currency/>}/>
            <Route path='/payment' element={<Payment/>}/>
          </Routes>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
