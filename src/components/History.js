import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { getUserOrderHistory } from '../graphql/queries'
const History = () => {
    const [userid,setUserid] = useState('')
    const {loading,error,data} = useQuery(getUserOrderHistory,{
        variables:{
            User_ID:userid
        }
    })
    useEffect(()=>{
        if(localStorage.getItem('token')===null){
            setUserid('')
        }
        else{
            setUserid(JSON.parse(localStorage.getItem('token')).userId.id)
        }
    },[])
  return (
    <div className='mt-20 mb-10'>
        <h1 className='font-semibold '>Order History</h1>
        <div className='grid lg:grid-cols-4 gap-3'>
            {!loading && data.getUserOrderHistory.map((itemProBid, indexProBid)=>(
                <div className='bg-link p-3 rounded-lg' key={itemProBid.Order_ID} >
                    <div>
                        <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                            {itemProBid.Product_Auction_ID.Product_ID.Product_Image.slice(0,2).map((itemProBidImg, indexProBidImg)=>(
                                <div key={itemProBidImg.Product_Image_ID} className='row-span-2'>
                                    <img src={itemProBidImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                </div>
                            ))}
                        </div>
                        <h1>Product Name: {itemProBid.Product_Auction_ID.Product_ID.Product_Name}</h1>
                        <h1>Status: {itemProBid.Status && 'Success payment'}</h1>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default History