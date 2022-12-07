import React,{useState} from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
const CurrencyItem = () => {
    const [showMoney, setShowMoney] = useState(false)
    const isShow = ()=>setShowMoney(!showMoney)
  return (
    <>
        <h1 className='text-center font-semibold text-2xl mb-6'>Currency</h1>
        <div className='relative mb-20'>
            <div className='w-[500px] border-2 bg-white rounded-lg border-black border-w px-7 py-5 mx-16 before:content-[""] before:absolute before:w-full before:h-[1px] before:top-[90%] before:left-0 before:bg-slate-700 before:-z-10'> 
                <div className='flex items-center mb-5'>
                    <h1 className='mr-1 text-2xl font-semibold'>Current Balance (US): <span className='font-normal'>{showMoney ? `$156.55` : "********"}</span></h1>
                    <button onClick={isShow}>
                        {showMoney ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <div className='flex justify-evenly'>
                    <button className='px-6 py-2 bg-background-signup rounded-full'>Recharge</button>
                    <button className='px-6 py-2 bg-background-signup rounded-full'>Withdraw money</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CurrencyItem