import React from 'react'

const LayoutCartAndBid = ({children,text}) => {
  return (
    <div className='mt-20 mb-10'>
        <h1 className='text-3xl font-semibold mb-5'>{text}</h1>
        {children}
       
    </div>
  )
}

export default LayoutCartAndBid