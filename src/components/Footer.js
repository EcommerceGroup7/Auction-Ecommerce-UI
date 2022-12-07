import React from 'react'
import {Link} from 'react-router-dom'
import {BsFacebook} from 'react-icons/bs'
const Footer = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 py-10 mx-2 px-8 border-t-2">
        <div>
            <h1 className='font-bold mb-2'>Buy</h1>
            <ul>
                <li>
                    <Link className='hover:text-link'>Register</Link>
                </li>
                <li>
                    <Link className='hover:text-link'>Recharge</Link>
                </li>
                <li>
                    <Link className='hover:text-link'>Withdraw money</Link>
                </li>
            </ul>
        </div>
        <div>
            <h1 className='font-bold mb-2'>Sell</h1>
            <ul>
                <li>
                    <Link className='hover:text-link'>Start Selling</Link>
                </li>
                <li>
                    <Link className='hover:text-link'>Learn to sell</Link>
                </li>
            </ul>
        </div>
        <div>
            <h1 className='font-bold mb-2'>Stay connected</h1>
            <ul>
                <li className='flex items-center'>
                    <BsFacebook color='#0776e8'/><Link className='ml-2 hover:text-link'> Facebook</Link>
                </li>
            </ul>
        </div>
        <div>
            <h1 className='font-bold mb-2'>About FreshAuc</h1>
            <ul>
                <li>
                    <Link className='hover:text-link'>Company info</Link>
                </li>
                <li>
                    <Link className='hover:text-link'>Policies</Link>
                </li>
            </ul>
        </div>
        <div>
            <h1 className='font-bold mb-2'>Help & contact</h1>
            <ul>
                <li>
                    Contact us
                </li>
                <li>
                    <Link className='hover:text-link'>vinhnguyen19052002@gmail.com</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer