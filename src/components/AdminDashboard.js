import React from 'react'
import {BiUser} from 'react-icons/bi'
import {FaUsers} from 'react-icons/fa'
import {RiAuctionFill} from 'react-icons/ri'
const AdminDashboard = () => {
  return (
    <div>AdminDashboard
        <div className='grid grid-cols-4 m-5 gap-x-8'>
            <div className='flex justify-between items-center bg-slate-700 px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <BiUser size={30}/>
                    <h1 className='text-base'>User</h1>
                </div>
                <h1>59</h1>
            </div>
            <div className='flex justify-between items-center bg-slate-700 px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <FaUsers size={30}/>
                    <h1 className='text-base'>Users Sell</h1>
                </div>
                <h1>59</h1>
            </div>
            <div className='flex justify-between items-center bg-slate-700 px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <RiAuctionFill size={30}/>
                    <h1 className='text-base'>Auction Field</h1>
                </div>
                <h1>59</h1>
            </div>
            <div className='flex justify-between items-center bg-slate-700 px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <BiUser size={30}/>
                    <h1 className='text-base'>User</h1>
                </div>
                <h1>59</h1>
            </div>
        </div>
        <div className='grid grid-cols-2'>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default AdminDashboard