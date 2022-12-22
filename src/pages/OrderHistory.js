import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import History from '../components/History'
const OrderHistory = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-2'>
            <History/>
            <Footer/>
        </div>
    </>
  )
}

export default OrderHistory