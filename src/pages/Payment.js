import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Paypal from '../components/Paypal'


const Payment = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-3'>
            <div className='mt-20 mb-10 mx-auto -z-10'>
                <Paypal/>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Payment