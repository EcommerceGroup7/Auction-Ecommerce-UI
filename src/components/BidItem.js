import React from 'react'
import crab from '../imgs/crab.jpg'
import {BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const BidItem = ({id,img,name,currentBid,bid,time}) => {
    const times = new Date(time)
  return (
    <Link to={`/item/${id}`} className='grid grid-cols-5 justify-items-center items-center py-1 border-b-2 border-black'>
        <div className='flex items-center gap-2'>
            <img src={img} alt="" className='rounded-2xl w-40 h-40 object-cover'/>
        </div>
        <div>
            <h1 className='font-semibold text-xl'>{name}</h1>
        </div>
        <div>
            <h1>${currentBid}</h1>
        </div>
        <div>
            <h1>${bid}</h1>
        </div>
        <div>
            <h1>{times.toString().slice(4,24)}</h1>
        </div>
    </Link>
  )
}

export default BidItem