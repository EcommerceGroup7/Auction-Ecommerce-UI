import React from 'react'
import crab from '../imgs/crab.jpg'
import {BsFillTrashFill} from 'react-icons/bs'
const BidItem = () => {
  return (
    <div className='grid grid-cols-5 justify-items-center items-center py-1 border-b-2 border-black'>
        <BsFillTrashFill/>
        <div className='flex items-center gap-2'>
            <img src={crab} alt="" className='rounded-2xl'/>
        </div>
        <div>
            <h1 className='font-semibold text-xl'>Crab</h1>
        </div>
        <div>
            <h1>$100</h1>
        </div>
        <div>
            <h1>$615</h1>
        </div>
    </div>
  )
}

export default BidItem