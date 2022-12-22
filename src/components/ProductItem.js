import React,{useEffect, useState} from 'react'
import ModalUpdateProduct from './ModalUpdateProduct'
import { useQuery } from '@apollo/client'
import {getProductById} from '../graphql/queries'
import { useParams } from 'react-router-dom'
const ProductItem = () => {
    const params = useParams()
    const [showModal, setShowModal] = useState(false)
    const [imgState, setImgState] = useState("")
    const {loading,error,data} = useQuery(getProductById,{
        variables:{
            Product_ID:params.productItem
        }
    })
    useEffect(()=>{
        if(!loading){
            setImgState(data.getProductById.Product_Image[0].Product_Image_Url)
        }
    },[loading,data])
  return (
    
    <div className='mt-20 mb-10'>
        {!loading && (

            <div className='grid lg:grid-cols-6 gap-x-2 mb-4'>
                <div className='lg:col-span-2 h-fit items-center w-full  p-2 border border-black rounded-lg'>
                    <div className='grid lg:grid-cols-1 justify-items-center '>
                        <div className='w-full h-[268px] mb-1  '>
                            <img className='w-full h-full rounded-lg' src={imgState} alt="" onClick={()=>setImgState(data.getProductById.Product_Image[0].Product_Image_Url)}/>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 w-full'>
                                {data.getProductById.Product_Image.map((itemImg,indexImg)=>(
                                    <div className='w-full h-16' key={itemImg.Product_Image_ID}>
                                        <img className='w-full h-full rounded-lg' src={itemImg.Product_Image_Url} alt="" onClick={()=>setImgState(itemImg.Product_Image_Url)}/>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-4 '>
                    <div className='p-2 border border-black rounded-lg mb-3'>
                        <h1 className='text-xl font-semibold mb-2'>{data.getProductById.Product_Name}</h1>
                        <div className='ml-12 px-5'>
                            <h1 className='font-semibold text-xl'>Weight: {data.getProductById.Weight}kg</h1>
                        </div>
                        <div className='ml-12 px-5'>
                            <h1 className='font-semibold text-xl'>Price: ${data.getProductById.Price}</h1>
                        </div>
                        <div className='ml-12 px-5'>
                            <h1 className='font-semibold text-xl'>Description</h1>
                            <p>{data.getProductById.Product_Info}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>setShowModal(true)} className='mr-3 inline-block px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg focus:bg-link focus:shadow-lg focus:outline-none focus:ring-0 active:bg-link active:shadow-lg transition duration-150 ease-in-out'>Update</button>
                    </div>
                </div>
            </div>
        )}
        <ModalUpdateProduct isVisible={showModal} onClose={()=>setShowModal(false)}/>
    </div>
  )
}

export default ProductItem