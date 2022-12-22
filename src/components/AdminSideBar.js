import React from 'react'
import {MdDashboard,MdProductionQuantityLimits,MdCardGiftcard} from 'react-icons/md'
import {HiCurrencyDollar} from 'react-icons/hi'
import {AiFillSetting} from 'react-icons/ai'
import { Link } from 'react-router-dom'
const AdminSideBar = () => {
  return (
    <div className='w-72 h-full border-2 border-background-signup rounded-lg p-3'>
        <ul>
            <Link  to='/dashboard' className='flex items-center px-2 py-2 rounded-lg gap-2 mb-4 cursor-pointer hover:bg-link hover:text-white transition-all ease-in-out duration-500'>
                <MdDashboard size={25}/>
                <h1>Dashboard</h1>
            </Link>
            <Link to='/productmana' className='flex items-center px-2 py-2 rounded-lg gap-2 mb-4 cursor-pointer hover:bg-link hover:text-white transition-all ease-in-out duration-500'>
                <MdProductionQuantityLimits size={25}/>
                <h1>Product</h1>
            </Link>
            <Link to='/current' className='flex items-center px-2 py-2 rounded-lg gap-2 mb-4 cursor-pointer hover:bg-link hover:text-white transition-all ease-in-out duration-500'>
                <HiCurrencyDollar size={25}/>
                <h1>Currency</h1>
            </Link>
            <Link to='/editBid' className='flex items-center px-2 py-2 rounded-lg gap-2 mb-4 cursor-pointer hover:bg-link hover:text-white transition-all ease-in-out duration-500'>
                <AiFillSetting size={25}/>
                <h1 >Settings Bid</h1>
            </Link>
        </ul>
    </div>
  )
}

export default AdminSideBar