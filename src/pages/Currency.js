import React,{useEffect} from 'react'
import CurrencyItem from '../components/CurrencyItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Currency = () => {
  useEffect(()=>{
    document.title = "FreshAuc - Wallet"
  },[])
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-3'>
          <div className='mt-20 mb-10'>
            <CurrencyItem/>
          </div>
          <Footer/>
        </div>
    </>
  )
}

export default Currency