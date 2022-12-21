import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import ModalBid from './ModalBid'
import {AiOutlinePlus} from 'react-icons/ai'
import { useQuery,useMutation } from '@apollo/client'
import { createProductAuction } from '../graphql/mutation'
import { getProductByUser } from '../graphql/queries'   
const ProductList = () => {
    const [showModal, setShowModal] = useState(false)
    const [dataShowModal,setDataShowModal] = useState(null)
    const [userInfo,setUserInfo] = useState('')
    const {loading:loadingProduct, error:errorProduct, data:dataProduct} = useQuery(getProductByUser,{
        variables:{
            User_ID:userInfo
        }
    })
    const handleModalBid = (data)=>{
        setShowModal(true)
        setDataShowModal(data)
    }
    useEffect(()=>{
        if(localStorage.getItem('token') === null){
            setUserInfo('')
        }
        else{
            setUserInfo(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        console.log(dataProduct);
    },[dataProduct])
  return (
    <div className='mt-20 mb-10'>
        <h1 className='font-semibold '>Product Management</h1>
        <div className='grid lg:grid-cols-4 gap-3'>
            {!loadingProduct && dataProduct.getProductByUser.map((itemProBid, indexProBid)=>(
                <div className='bg-link p-3 rounded-lg' key={itemProBid.Product_ID} >
                    <Link to={`/product/${itemProBid.Product_ID}`}>
                        <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                            {itemProBid.Product_Image.slice(0,2).map((itemProBidImg, indexProBidImg)=>(
                                <div key={itemProBidImg.Product_Image_ID} className='row-span-2'>
                                    <img src={itemProBidImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                </div>
                            ))}
                        </div>
                        <h1>Product Name: {itemProBid.Product_Name}</h1>
                        <h1>Price: ${itemProBid.Price}</h1>
                    </Link>
                    <div className='mt-3 z-10'>
                        <button onClick={()=>handleModalBid(itemProBid)} disabled={itemProBid.Weight === 0 ? true :false} className={`inline-block px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded shadow-md ${itemProBid.Weight === 0 ? `` : `hover:bg-link hover:shadow-lg focus:bg-link focus:shadow-lg focus:outline-none focus:ring-0 active:bg-link active:shadow-lg transition duration-150 ease-in-out`}`}>Update Bid</button>
                    </div>
                    {itemProBid.Weight === 0 && <p className='text-red-700 text-base'>Item is out of stock</p>}
                </div>
            ))}
            <div className='flex justify-center items-center'>
                <Link className='p-4 bg-link rounded-full' to='/product/addItem'>
                    <AiOutlinePlus size={30}/>
                </Link>
            </div>
            <ModalBid isVisible={showModal} onClose={()=>setShowModal(false)} dataShowModal={dataShowModal}/>
        </div>
    </div>
  )
}

export default ProductList