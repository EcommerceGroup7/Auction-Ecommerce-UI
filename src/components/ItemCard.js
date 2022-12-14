import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {  getProductAuctionById, getSimilartProductAuction,getMinTimeToDiscount} from '../graphql/queries'
import Countdown from './Countdown'
const ItemCard = () => {
    const [imgState, setImgState] = useState('')
    const param = useParams()
    const {loading:loadingCurItem, error, data:dataCurItem, refetch:refecthGetId} = useQuery(getProductAuctionById,{
        variables:{
            Product_Auction_ID:param.cateItem
        }
    })
    const {loading: loadingSimilar, error:errorSimilar, data:dataSimilar, refetch:refetchSimilar} = useQuery(getSimilartProductAuction,{
        variables:{
            Product_Auction_ID:param.cateItem
        }
    })
    const {loading:loadingMinTime, error:errorMinTime, data:dataMinTime} = useQuery(getMinTimeToDiscount)
    useEffect(()=>{
        console.log(dataCurItem);
        console.log(dataSimilar);
        if(!loadingCurItem){
            setImgState(dataCurItem.getProductAuctionById.Product_ID.Product_Image[0].Product_Image_Url)
        }
        const intervalMinTime = setInterval(()=>{
            refecthGetId({
                Product_Auction_ID:param.cateItem
            })
            refetchSimilar({
                Product_Auction_ID:param.cateItem
            })
        },(!loadingMinTime && dataMinTime.getMinTimeToDiscount * 60 *1000 + 1500))
        return ()=>clearInterval(intervalMinTime)
    },[dataCurItem,dataSimilar,loadingCurItem,refecthGetId,refetchSimilar,loadingMinTime,dataMinTime.getMinTimeToDiscount,param.cateItem])
  return (
    <div className='mt-20 mb-10'>
        {!loadingCurItem && (
            <div className='grid lg:grid-cols-6 gap-x-2 mb-4'>
                <div className='lg:col-span-2 h-fit items-center w-full  p-2 border border-black rounded-lg'>
                    <div className='grid lg:grid-cols-1 justify-items-center '>
                        <div className='w-full h-[268px] mb-1  '>
                            <img className='w-full h-full rounded-lg object-cover' src={imgState} alt="" onClick={()=>setImgState(dataCurItem.getProductAuctionById.Product_ID.Product_Image[0].Product_Image_Url)}/>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 w-full'>
                            {dataCurItem.getProductAuctionById.Product_ID.Product_Image.slice(0,4).map((itemImg,indexImg)=>(
                                <div className='w-full h-16' key={itemImg.Product_Image_ID}>
                                    <img className='w-full h-full rounded-lg object-cover' src={itemImg.Product_Image_Url} alt="" onClick={()=>setImgState(itemImg.Product_Image_Url)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-4 p-2 border border-black rounded-lg'>
                    <h1 className='text-xl font-semibold mb-10'>{dataCurItem.getProductAuctionById.Product_ID.Product_Name}</h1>
                    <div className='grid grid-cols-2 ml-12 mb-4 p-5 border-t-2 border-b-2 border-black'>
                        <div>
                            <div className='flex'>
                                <Countdown start={dataCurItem.getProductAuctionById.Auction_Field_ID.Start_Time} end={dataCurItem.getProductAuctionById.Auction_Field_ID.End_Time}/>
                            </div>
                            <div className='flex'>
                                
                                <h1>Price:</h1>
                                <h1>US ${dataCurItem.getProductAuctionById.Current_Price}</h1>
                            </div>
                        </div>
                        <button type='button' className='font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup hover:bg-textcolor transition-all'>Buy it now</button>
                    </div>
                    <div className='ml-12 p-5 border-t-2 border-b-2 border-black mb-4'>
                        <h1 className='mb-3'>Current Bid: </h1>
                        <form className='grid grid-cols-2 items-center'>
                            <div className='flex h-fit'>
                                <h1 className='mr-5'>Bid</h1>
                                <div>
                                    <input type='text' className='w-32 h-7 rounded-xl outline-none px-3 border-black border-2'/>
                                </div>
                            </div>
                            <button type='submit' className='font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup hover:bg-textcolor transition-all'>Bid now</button>
                        </form>
                    </div>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Description</h1>
                        <p>{dataCurItem.getProductAuctionById.Product_ID.Product_Info}</p>
                    </div>
                </div>
            </div>
        )}
        <div>
            <h1 className='font-semibold text-xl'>Similar Item Bid</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4'>
                {!loadingSimilar && dataSimilar.getSimilartProductAuction.map((itemSimi,indexSimi)=>(
                    <Link className='bg-link p-3 rounded-lg' key={itemSimi.Product_Auction_ID} to={`/item/${itemSimi.Product_Auction_ID}`}>
                        <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                            {itemSimi.Product_ID.Product_Image.slice(0,2).map((itemSimiImg,indexSimiImg)=>(
                                <div className='row-span-2' key={itemSimiImg.Product_Image_ID}>
                                    <img src={itemSimiImg.Product_Image_Url} alt="" className='h-full rounded-lg'/>
                                </div>
                            ))}
                        </div>
                        <h1>Product Name: {itemSimi.Product_ID.Product_Name}</h1>
                        <h1>Starting Price: {itemSimi.Starting_Price}$</h1>
                        <h1>Current Price: {itemSimi.Current_Price}$</h1>
                        <Countdown start={itemSimi.Auction_Field_ID.Start_Time} end={itemSimi.Auction_Field_ID.End_Time}/>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ItemCard