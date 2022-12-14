import './App.css';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import AddItemPage from './pages/AddItemPage';
import Profile from './pages/Profile';
import ProductMangament from './pages/ProductMangament';
import ProductItemPage from './pages/ProductItemPage';
import AdminHome from './admin/AdminHome';
import AdminBid from './admin/AdminBid';
import AdminOrder from './admin/AdminOrder';
import AdminProduct from './admin/AdminProduct';
import AdminCurrency from './admin/AdminCurrency';

export const UserContext = createContext()
function App() {
  const [searchValue,setSearchValue] = useState('')
  return (
    <UserContext.Provider value={{searchValue,setSearchValue}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              {/* <Route path='/dashboard' element={<AdminHome/>}/>
              <Route path='/order' element={<AdminOrder/>}/>
              <Route path='/productmana' element={<AdminProduct/>}/>
              <Route path='/editBid' element={<AdminBid/>}/>
              <Route path='/current' element={<AdminCurrency/>}/> */}
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
              <Route path='/product' element={<ProductMangament/>}/>
              <Route path='/product/addItem' element={<AddItemPage/>}/>
              <Route path='/product/:productItem' element={<ProductItemPage/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          </Router>
      </LocalizationProvider>
    </UserContext.Provider>
  );
}

export default App;
