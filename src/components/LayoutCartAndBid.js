import React from 'react'

const LayoutCartAndBid = ({children}) => {
  return (
    <div className='mt-20 mb-10'>
        <h1 className='text-3xl font-semibold mb-5'>Your Cart</h1>
        {children}
       
    </div>
  )
}

export default LayoutCartAndBid