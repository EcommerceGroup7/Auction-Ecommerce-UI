import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Wallet from '../components/Wallet'
const WalletPage = () => {
  
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-3'>
            <div className='mt-20 mb-10 mx-auto -z-10'>
                <Wallet/>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default WalletPage