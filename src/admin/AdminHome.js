import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import AdminNavbar from '../components/AdminNavbar'
import AdminSideBar from '../components/AdminSideBar'

const AdminHome = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='lg:container mx-auto flex mt-20 gap-5'>
            <AdminSideBar/>
            <div className='flex-1 bg-red-600'>
                <AdminDashboard/>
            </div>
        </div>
    </>
  )
}

export default AdminHome