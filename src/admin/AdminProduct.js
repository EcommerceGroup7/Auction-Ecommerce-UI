import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminProductSection from '../components/AdminProductSection'
import AdminSideBar from '../components/AdminSideBar'

const AdminProduct = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='lg:container mx-auto flex mt-20 gap-5'>
            <AdminSideBar/>
            <div className='flex-1 '>
                <AdminProductSection/>
            </div>
        </div>
    </>
  )
}

export default AdminProduct