import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminOrderSection from '../components/AdminOrderSection'
import AdminSideBar from '../components/AdminSideBar'

const AdminOrder = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='lg:container mx-auto flex mt-20 gap-5'>
            <AdminSideBar/>
            <div className='flex-1 '>
                <AdminOrderSection/>
            </div>
        </div>
    </>
  )
}

export default AdminOrder