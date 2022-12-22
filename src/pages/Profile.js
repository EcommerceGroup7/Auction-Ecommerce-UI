import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Personal from '../components/Personal'

const Profile = () => {
  useEffect(()=>{
    document.title = "FreshAuc - Profile"
  },[])
  return (
    <>
        <Navbar/>
        <div className='lg:container mx-auto px-3'>
            <Personal/>
            <Footer/>
        </div>
    </>

  )
}

export default Profile