import React from 'react'
import {Link} from 'react-router-dom'
import ShoppingCartItem from './ShoppingCartItem'
import LayoutCartAndBid from './LayoutCartAndBid'
const ShoppingCart = () => {
  return (
    <LayoutCartAndBid>
        <div className='grid lg:grid-cols-5 gap-5'>
            <div className='col-span-4 h-max '>
                <div className='grid grid-cols-6 bg-background-signup rounded-t-2xl py-2 justify-items-center mb-3'>
                    <div></div>
                    <div className='font-semibold'>Image</div>
                    <div className='font-semibold'>
                        <h1>Product</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Price</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Quantity</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Total</h1>
                    </div>
                </div>
                <ShoppingCartItem/>
                <ShoppingCartItem/>
                <ShoppingCartItem/>
                <ShoppingCartItem/>
            </div>
            <div className='col-span-4 sm:col-span-4 lg:col-span-1 bg-background-signup px-7 pb-9 pt-4 rounded-2xl h-max'>
                <h1 className='text-center font-semibold text-2xl mb-4'>Summary</h1>
                <div className='mb-6'>
                    <div className='flex justify-between mb-2'>
                        <h3 className='font-medium'>Sub Total:</h3>
                        <h3>$167</h3>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <h3 className='font-medium'>Shipping:</h3>
                        <h3>$15</h3>
                    </div>
                    <div className='flex justify-between'>
                        <h3 className='font-medium'>Total:</h3>
                        <h3>$665</h3>
                    </div>
                </div>
                <Link className='text-center block bg-link px-5 py-2 rounded-2xl font-semibold'>Checkout</Link>
            </div>
        </div>
    </LayoutCartAndBid>
  )
}

export default ShoppingCart