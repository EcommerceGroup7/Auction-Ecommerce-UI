import React,{useEffect, useState} from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useQuery } from '@apollo/client'
import { getCurrentByUser, getLastCurrencyLog} from '../graphql/queries'
import {GiPayMoney,GiReceiveMoney,GiTakeMyMoney} from 'react-icons/gi'
import { Link } from 'react-router-dom'
const CurrencyItem = () => {
    const [showMoney, setShowMoney] = useState(false)
    const [userInfo, setUserInfo]=useState('')
    const {loading, error, data,refetch} = useQuery(getCurrentByUser,{
        variables:{
            User_ID:userInfo
        }
    })
    const {loading:loadingLastCur, error:errorLastCur, data:dataLastCur} = useQuery(getLastCurrencyLog,{
        variables:{
            User_ID:userInfo
        }
    })
    const isShow = ()=>setShowMoney(!showMoney)
    useEffect(()=>{
        if(localStorage.getItem('token') === null){
            setUserInfo('')
        }
        else{
            setUserInfo(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        refetch({
            User_ID:userInfo
        })
        console.log(data);
        console.log((dataLastCur));
    },[data,dataLastCur,refetch,userInfo])
  return (
    <React.Fragment>
        
            
        <h1 className='text-center font-semibold text-2xl mb-6'>Currency</h1>
        <div className='relative mb-5'>
            <div className='w-[500px] border-2 bg-white rounded-lg border-black border-w px-7 py-5 mx-16 before:content-[""] before:absolute before:w-full before:h-[1px] before:top-[90%] before:left-0 before:bg-slate-700 before:-z-10'> 
                <div className='flex items-center mb-5'>
                    <h1 className='mr-1 text-2xl font-semibold'>Current Balance (US): <span className='font-normal'>{showMoney ? `$${!loading&&data.getCurrentByUser.Total_Money}` : "********"}</span></h1>
                    <button onClick={isShow}>
                        {showMoney ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <div className='flex justify-evenly'>
                    <Link to='/wallet/recharge' className='px-6 py-2 bg-background-signup rounded-full'>Recharge</Link>
                </div>
            </div>
        </div>
        <div className='mb-20'>
            {!loadingLastCur && dataLastCur.getLastCurrencyLog.map((itemLastCur,indexLastCur)=>(
                <div key={itemLastCur.Currency_Log_ID} className='flex justify-between items-center py-2 border-b-2'>
                    <div className='flex items-center gap-2 p-3 border-2 border-background-signup w-fit rounded-md'>
                        {itemLastCur.Currency_Log_Value.includes("-") ? <GiPayMoney size={40} color={"#DC143C"}/>  : <GiReceiveMoney size={40} color={"#13A779"}/>}
                        {itemLastCur.Currency_Log_Value.includes("-") ? <h1>Withdraw</h1>  : <h1>Deposit</h1>}
                    </div>
                    <div>

                        {
                            itemLastCur.Currency_Log_Value.includes("-") ? <h1 className='text-lg font-semibold text-[#DC143C]'>${itemLastCur.Currency_Log_Value}</h1> : <h1 className='text-lg font-semibold text-[#13A779]'>${itemLastCur.Currency_Log_Value}</h1>
                        }
                        
                    </div>
                </div>
            ))}
        </div>
    
        
    </React.Fragment>
  )
}

export default CurrencyItem