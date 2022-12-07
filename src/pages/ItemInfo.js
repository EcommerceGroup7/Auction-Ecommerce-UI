import React from 'react'
import Footer from '../components/Footer'
import ItemCard from '../components/ItemCard'
import Navbar from '../components/Navbar'

const ItemInfo = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto p-3'>
            <ItemCard/>
            <Footer/>
        </div>
    </>
  )
}

export default ItemInfo