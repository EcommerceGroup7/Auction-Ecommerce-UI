import React, {useEffect, useState,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery,useMutation } from '@apollo/client'
import {  getUserById,getProductAuctionById, getSimilartProductAuction,getMinTimeToDiscount,getCurrentBid} from '../graphql/queries'
import { createUserBid, orderProductAuction } from '../graphql/mutation'
import Countdown from './Countdown'
import { UserContext } from '../App'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const ItemCard = () => {
    const navigate = useNavigate()
    const param = useParams()
    const [userId,setUserId] = useState()
    const [imgState, setImgState] = useState('')
    const [isUserLogin, setIsUserLogin] = useState('')
    const [bidValue, setBidValue] = useState('')
    const [errorOrder,setErrorOrder] = useState('')
    const {cartValue,setCartValue} = useContext(UserContext)
    const [userBid, dataMutation] = useMutation(createUserBid)
    const [orderProductAuc,dataMutationProductAuc] = useMutation(orderProductAuction)
    const bidSuccess = ()=> toast.success(`Bid is successfully $${bidValue}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const buySuccess = ()=> toast.success(`Buy is successfully`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    
    const {values, touched, handleSubmit:handleSubmitBid, handleChange:handleChangeBid} = useFormik({
        initialValues:{
            productAucId:param.cateItem,
            valueBid:bidValue,
        },
        onSubmit: async values=>{
            try{
                await userBid({
                    variables:{
                        Product_Auction_ID:values.productAucId,
                        Price:+values.valueBid
                    }
                })
                
            }
            catch(err){
                console.log(err.message);
                
            }
        }
    })
    const {loading:loadingCurBid, error:errorCurBid, data:dataCurBid, refetch:refetchDataCurBid} = useQuery(getCurrentBid,{
        variables:{
            Product_Auction_ID:param.cateItem,
            User_ID:localStorage.getItem('token') === null ? '' : JSON.parse(localStorage.getItem('token')).userId.id
        }
    })
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
    const {loading:loaidingUser, error:errorUser,data:dataUser} = useQuery(getUserById,{
        variables:{
            User_ID:localStorage.getItem('token') === null ? '' : JSON.parse(localStorage.getItem('token')).userId.id
        }
    })
    const handleClickOrderProductAuc = async() =>{
        try{
            if(!loaidingUser && dataUser.getUserById.Address.length === 0){
                alert("You need add your address to buy item")
                navigate('/profile')
            }else{
                await orderProductAuc({
                    variables:{
                        Product_Auction_ID:param.cateItem
                    }
                })
                alert('You have buy this item, please payment for it')
                navigate('/checkout')
            }
            // setCartValue(cartValue+1)
        }
        catch(err){
            console.log(err.message);
            setErrorOrder(err.message)
        }
        
        // if(!dataMutationProductAuc.loading && dataMutationProductAuc.called){
        //     if(dataMutationProductAuc.error){
        //         console.log(dataMutationProductAuc.error);
        //     }
        //     else{
        //         buySuccess()
        //     }
        // }
    }
    useEffect(()=>{
        console.log(dataCurBid);
        if(localStorage.getItem('token') === null){
            setIsUserLogin(false)
            setUserId('')
        }
        else{
            setIsUserLogin(true)
            setUserId(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        if(!dataMutation.loading && dataMutation.called){
            if(dataMutation.error){
                // console.log(dataMutation.error.message);
            }
            else{
                bidSuccess()
                setBidValue(dataMutation.data.createUserBid.Price)
                refetchDataCurBid({
                    Product_Auction_ID:param.cateItem,
                    User_ID:localStorage.getItem('token') === null ? '' : JSON.parse(localStorage.getItem('token')).userId.id
                })
                values.valueBid = ''
            }
        }
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
        },(!loadingMinTime && dataMinTime?.getMinTimeToDiscount * 60 *1000 + 1000))
        return ()=>clearInterval(intervalMinTime)
    },[dataCurBid,dataMutation.loading,dataMutation.called,dataMutation.error,loadingCurItem,refecthGetId,refetchSimilar,loadingMinTime,dataMinTime,param.cateItem])
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
                    <div className='grid grid-cols-5 ml-12 mb-4 p-5 border-t-2 border-b-2 border-black'>
                        <div className='col-span-3'>
                            <div className='flex'>
                                <Countdown start={dataCurItem.getProductAuctionById.Auction_Field_ID.Start_Time} end={dataCurItem.getProductAuctionById.Auction_Field_ID.End_Time}/>
                            </div>
                            <div className='flex gap-1'>
                                <h1 className='font-semibold'>Price:</h1>
                                <h1>US ${dataCurItem.getProductAuctionById.Current_Price}</h1>
                            </div>
                        </div>
                        <button type='button' onClick={handleClickOrderProductAuc} disabled={isUserLogin ? false : true} className={`col-span-2 font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup ${isUserLogin && `cursor-pointer hover:bg-textcolor transition-all`}`}>Buy it now</button>
                        {!isUserLogin && <p className='text-red-700 col-span-5'>You must sign in to buy this product</p>}
                        {errorOrder && <p className='text-red-700 col-span-5'>{errorOrder}</p>}
                    </div>
                    <div className='ml-12 p-5 border-t-2 border-b-2 border-black mb-4'>
                        <h1 className='mb-3 font-semibold'>Current Bid: ${(!loadingCurBid&&errorCurBid) ? 0 : (!loadingCurBid&&dataCurBid.getCurrentBid.Price)}</h1>
                        <form className='grid grid-cols-5 items-center' onSubmit={handleSubmitBid}>
                            <div className='flex h-fit col-span-3'>
                                <h1 className='mr-5 font-semibold'>Bid</h1>
                                <div>
                                    <input disabled={isUserLogin ? false : true} onChange={handleChangeBid} value={values.valueBid} type='text' id='valueBid' name='valueBid' className='w-32 h-7 rounded-xl outline-none px-3 border-black border-2'/>
                                </div>
                            </div>
                            <button type='submit' disabled={isUserLogin && (values.valueBid < dataCurItem.getProductAuctionById.Current_Price) ? false : true} className={`col-span-2 font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup ${(isUserLogin && (values.valueBid < dataCurItem.getProductAuctionById.Current_Price)) && `cursor-pointer hover:bg-textcolor transition-all`}`}>Bid now</button>
                            {!isUserLogin && <p className='text-red-700 col-span-5'>You must sign in to bid this product</p>}
                            {values.valueBid >= dataCurItem.getProductAuctionById.Current_Price && <p className='text-red-700 col-span-5'>You bid less than {dataCurItem.getProductAuctionById.Current_Price}</p>}
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
                    <Link className='bg-link p-3 rounded-lg' key={itemSimi.Product_Auction_ID} to={userId === itemSimi.User_ID.User_ID ?`/product/${itemSimi.Product_Auction_ID}` :`/item/${itemSimi.Product_Auction_ID}`}>
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
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    </div>
  )
}

export default ItemCard