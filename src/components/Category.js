import React from 'react'
import { Link } from 'react-router-dom'
const Category = ({imgUrl, nameCate}) => {
  return (
    <div className='flex flex-col items-center w-max'>
      <Link to={`/categories/${nameCate}`}>
        <div className='w-36 h-36 rounded-full overflow-hidden mb-3'>
          <img src={imgUrl} alt="chưa có ảnh"  className='w-full h-full object-cover '/>
        </div>
      </Link>
      <Link className='font-semibold'>{nameCate}</Link>
    </div>
  )
}

export default Category