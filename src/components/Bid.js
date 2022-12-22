import React, { useEffect, useState } from 'react'
import LayoutCartAndBid from './LayoutCartAndBid'
import {Link} from 'react-router-dom'
import BidItem from './BidItem'
import { useQuery } from '@apollo/client'
import { getUserBidding } from '../graphql/queries'
const Bid = () => {
    const [userid, setUserid] = useState('')
    const {loading, error,data} = useQuery(getUserBidding,{
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
    <LayoutCartAndBid text="Current Bid">
        <div className='grid lg:grid-cols-7 gap-5'>
            <div className='col-span-7 h-max '>
                <div className='grid grid-cols-5 bg-background-signup rounded-t-2xl py-2 justify-items-center mb-3'>
                    <div className='font-semibold'>Image</div>
                    <div className='font-semibold'>
                        <h1>Product</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Current Price</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Bidden</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Time Bid</h1>
                    </div>
                </div>
                {!loading && data.getUserBidding.map((itemBiding,indexBiding)=>(
                    <BidItem key={itemBiding.Product_Auction.Product_Auction_ID} id={itemBiding.Product_Auction.Product_Auction_ID} img={itemBiding.Product_Auction.Product_ID.Product_Image[0].Product_Image_Url} name={itemBiding.Product_Auction.Product_ID.Product_Name} currentBid={itemBiding.Product_Auction.Current_Price} bid={itemBiding.Price} time={itemBiding.Time}/>
                ))}
                {/* <BidItem/>
                <BidItem/> */}
            </div>
        </div>
    </LayoutCartAndBid>
  )
}

export default Bid