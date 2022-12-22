import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShoppingCart from '../components/ShoppingCart'
const ShoppingCarts = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <ShoppingCart/>
            <Footer/>
        </div>
    </>
  )
}

export default ShoppingCarts