import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ListItem from '../components/ListItem'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
const ListCategories = () => {
  useEffect(()=>{
    document.title = "FreshAuc - Product"
  },[])
  return (
    <>
      <Navbar/>
      <div className="lg:container mx-auto px-3">
        <div className='grid md:grid-cols-5 my-20'>
          <Sidebar/>
          <ListItem/>
        </div>
        <Footer/>
      </div>
    </>
    
  )
}

export default ListCategories
