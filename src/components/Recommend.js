import React from 'react'
import { Link } from 'react-router-dom'
import crab from '../imgs/crab.jpg'
const Recommend = () => {
  return (
    <div className='flex flex-col items-center w-max'>
      <Link>
        <div className='w-36 h-36 rounded-full overflow-hidden mb-3'>
          <img src={crab} alt=""  className='w-full h-full object-cover '/>
        </div>
      </Link>
      <Link className='font-semibold'>$521.5</Link>
    </div>
  )
}

export default Recommend