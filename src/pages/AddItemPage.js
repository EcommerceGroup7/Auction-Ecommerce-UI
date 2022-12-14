import React from 'react'
import AddItem from '../components/AddItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
const AddItemPage = () => {
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