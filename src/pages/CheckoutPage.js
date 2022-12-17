import React from 'react'
import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const CheckoutPage = () => {
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