import React from 'react'
import AdminAddBid from '../components/AdminAddBid'
import AdminNavbar from '../components/AdminNavbar'
import AdminSideBar from '../components/AdminSideBar'

const AdminBid = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='lg:container mx-auto flex mt-20 gap-5'>
            <AdminSideBar/>
            <div className='flex-1 '>
                <AdminAddBid/>
            </div>
        </div>
    </>
  )
}

export default AdminBid