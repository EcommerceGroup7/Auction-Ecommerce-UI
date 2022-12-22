import React, { useEffect } from 'react'
import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const CheckoutPage = () => {
  useEffect(()=>{
    document.title = "FreshAuc - Checkout"
  },[])
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-5'>
            <Checkout/>
            <Footer/>
        </div>
    </>
  )
}

export default CheckoutPage