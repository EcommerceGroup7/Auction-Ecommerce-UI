import React from 'react'
import Navbar from '../components/Navbar'
import ShoppingCart from '../components/ShoppingCart'
import Footer from '../components/Footer'
const Budget = () => {
  return (
    <>
      <Navbar />
      <div className="lg:container mx-auto px-3">
        <ShoppingCart />
        <Footer />
      </div>
    </>
  )
}

export default Budget
