import React, { useEffect } from 'react'
import AddItem from '../components/AddItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
const AddItemPage = () => {
  useEffect(()=>{
    document.title = "FreshAuc - Add Item"
  },[])
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <AddItem/>
            <Footer/>
        </div>
    </>
  )
}

export default AddItemPage