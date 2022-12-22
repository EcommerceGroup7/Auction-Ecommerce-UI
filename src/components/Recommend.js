import React from 'react'
import { Link } from 'react-router-dom'
import crab from '../imgs/crab.jpg'
const Recommend = ({img,price}) => {
  return (
    <div className='flex flex-col items-center w-max'>
      <div >
        <div className='w-36 h-36 rounded-full overflow-hidden mb-3'>
          <img src={img} alt=""  className='w-full h-full object-cover '/>
        </div>
      </div>
      <div className='font-semibold'>${price}</div>
    </div>
  )
}
export default Recommend