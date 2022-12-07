import React from 'react'
import LayoutCartAndBid from './LayoutCartAndBid'
import {Link} from 'react-router-dom'
import BidItem from './BidItem'
const Bid = () => {
  return (
    <LayoutCartAndBid>
        <div className='grid lg:grid-cols-7 gap-5'>
            <div className='col-span-5 h-max '>
                <div className='grid grid-cols-5 bg-background-signup rounded-t-2xl py-2 justify-items-center mb-3'>
                    <div></div>
                    <div className='font-semibold'>Image</div>
                    <div className='font-semibold'>
                        <h1>Product</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Current Bid</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Bidden</h1>
                    </div>
                </div>
                <BidItem/>
                <BidItem/>
                <BidItem/>
            </div>
            <form className='col-span-5 sm:col-span-5 lg:col-span-2 bg-background-signup px-7 pb-9 pt-4 rounded-2xl h-max'>
                <h1 className='text-center font-semibold text-2xl mb-4'>Condition</h1>
                <div className='mb-6'>
                    <div className='flex justify-between mb-2'>
                        <h3 className='font-medium'>Current Bid:</h3>
                        <h3>$167</h3>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <h3 className='font-medium'>Bid Amount:</h3>
                        <input type='text' className='h-max w-16 rounded-md'></input>
                    </div>
                    <div className='flex'>
                        <h3 className='font-medium mr-1'>Time discount:</h3>
                        <h3>90 minutes</h3>
                    </div>
                    <div className='flex'>
                        <h3 className='font-medium mr-1'>Time left:</h3>
                        <h3>90 minutes</h3>
                    </div>
                </div>
                <button className='text-center w-full bg-link px-5 py-2 rounded-2xl font-semibold' type='submit'>Place Bid</button>
            </form>
        </div>
    </LayoutCartAndBid>
  )
}

export default Bid