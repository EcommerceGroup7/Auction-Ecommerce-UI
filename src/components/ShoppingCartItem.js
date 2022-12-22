import React from 'react'
import crab from '../imgs/crab.jpg'
import {BsFillTrashFill} from 'react-icons/bs'
const ShoppingCartItem = ({img,name,weight,total}) => {
  return (
    <div className='grid grid-cols-4  justify-items-center items-center py-1 border-b-2 border-black'>
        <div className='flex items-center gap-2'>
            <img src={img} alt="" className='rounded-2xl'/>
        </div>
        <div>
            <h1 className='font-semibold text-xl'>{name}</h1>
        </div>
        <div>
            <h1>${total}</h1>
        </div>
        <div>
            <h1>{weight}kg</h1>
        </div>
    </div>
  )
}

export default ShoppingCartItem