import React from 'react'
import {FaCcPaypal} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Checkout = () => {
  return (
    <div className='mt-20 mb-10'>
        <h1 className='text-center font-semibold text-3xl text-textcolor'>Check out</h1>
        <div>
            <h1 className='font-semibold text-2xl text-textcolor mb-2'>Delivery Address</h1>
            <div className='mb-4 ml-6'>
                <h1 className='text-base'><span className='text-textcolor'>Name: </span>Nguyen Van A | 0968459653</h1>
                <h1 className='text-base'><span className='text-textcolor'>Address: </span> 162, Vo Van Ngan, Thu Duc District, Ho Chi Minh City</h1>
            </div>
            <hr />
            <h1 className='mt-4 mb-2 font-semibold text-2xl text-textcolor'>All Products</h1>
            <div className='ml-6 flex gap-6 mb-4 flex-wrap'>
                <div className='flex gap-3'>
                    <img className='w-40 rounded-md' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Price</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <img className='w-40 rounded-md' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Price</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <img className='w-40 rounded-md' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Price</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex justify-between my-4'>
                <h1 className='font-semibold text-2xl text-textcolor mb-2'>Shipping</h1>
                <p className='font-medium text-lg'>$5</p>
            </div>
            <hr />
            <div className='flex justify-between my-4'>
                <h1 className='font-semibold text-2xl text-textcolor mb-2'>Order Total</h1>
                <p className='font-medium text-lg'>$52</p>
            </div>
            <hr />
            <div className='flex justify-between my-4'>
                <h1 className='font-semibold text-2xl text-textcolor mb-2'>Payment Option</h1>
                <FaCcPaypal size={50} color={"#009cde"}/>
            </div>
            <hr />
            <div className='my-4'>
                <h1 className='font-semibold text-2xl text-textcolor mb-2'>Payment Details</h1>
                <div className='ml-6'>
                    <div className='flex justify-between my-4'>
                        <h1 className='font-semibold text-lg text-textcolor mb-2'>Merchandise SubTotal</h1>
                        <p className='font-medium text-lg'>$53</p>
                    </div>
                    <div className='flex justify-between my-4'>
                        <h1 className='font-semibold text-lg text-textcolor mb-2'>Shipping Total</h1>
                        <p className='font-medium text-lg'>$53</p>
                    </div>
                    <div className='flex justify-between my-4'>
                        <h1 className='font-semibold text-lg  mb-2'>Payment Total</h1>
                        <p className='font-medium text-lg'>$53</p>
                    </div>
                </div>
            </div>
        </div>
        <Link to='/payment/pay' className='block w-fit mx-auto text-left px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg focus:bg-link focus:shadow-lg focus:outline-none focus:ring-0 active:bg-link active:shadow-lg transition duration-150 ease-in-out'>Checkout</Link>
    </div>
  )
}

export default Checkout