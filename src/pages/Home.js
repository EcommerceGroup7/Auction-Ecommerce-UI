import React, { useEffect } from 'react'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Recommends from '../components/Recommends'
import Silder from '../components/Silder'
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='lg:container mx-auto px-3'>
        <Silder/>
        <Recommends/>
        <Categories/>
        <Footer/> 
      </div>
    </>
  )
}

export default Home