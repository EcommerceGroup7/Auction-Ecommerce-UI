import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

const ProductMangament = () => {
  useEffect(()=>{
    document.title = 'FreshAuc - Product Management'
  },[])
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