import React, { useEffect } from 'react'
import Bid from '../components/Bid'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const CurrentBid = () => {
  useEffect(()=>{
    document.title = "FreshAuc - CurrentBid"
  },[])
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <Bid/>
            <Footer/>
        </div>
    </>
  )
}

export default CurrentBid