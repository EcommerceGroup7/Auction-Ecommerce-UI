import React from 'react'
import AdminCurrencySection from '../components/AdminCurrencySection'
import AdminNavbar from '../components/AdminNavbar'
import AdminSideBar from '../components/AdminSideBar'

const AdminCurrency = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='lg:container mx-auto flex mt-20 gap-5'>
            <AdminSideBar/>
            <div className='flex-1 '>
                <AdminCurrencySection/>
            </div>
        </div>
    </>
  )
}

export default AdminCurrency