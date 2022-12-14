import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductItem from '../components/ProductItem'

const ProductItemPage = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <ProductItem/>
            <Footer/>
        </div>
    </>
  )
}

export default ProductItemPage