import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

const ProductMangament = () => {
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <ProductList/>
            <Footer/>
        </div>
    </>
  )
}

export default ProductMangament