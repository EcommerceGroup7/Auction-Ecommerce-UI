import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {getProductById, getSimilarProduct} from '../graphql/queries'
const ItemCard = () => {
    const [imgState, setImgState] = useState('')
    const param = useParams()
    const {loading:loadingCurItem, error, data:dataCurItem} = useQuery(getProductById,{
        variables:{
            Product_ID:param.cateItem
        }
    })
    const {loading: loadingSimilar, error:errorSimilar, data:dataSimilar} = useQuery(getSimilarProduct,{
        variables:{
            Product_ID:param.cateItem
        }
    })
    useEffect(()=>{
        console.log(dataCurItem);
        console.log(dataSimilar);
        if(!loadingCurItem){
            setImgState(dataCurItem.getProductById.Product_Image[0].Product_Image_Url)
        }
    },[dataCurItem])
  return (
    <div className='mt-20 mb-10'>
        {!loadingCurItem && (
            <div className='grid lg:grid-cols-6 gap-x-2 mb-4'>
                <div className='lg:col-span-2 h-fit items-center w-full  p-2 border border-black rounded-lg'>
                    <div className='grid lg:grid-cols-1 justify-items-center '>
                        <div className='w-full h-[268px] mb-1  '>
                            <img className='w-full h-full rounded-lg' src={imgState} alt="" onClick={()=>setImgState(dataCurItem.getProductById.Product_Image[0].Product_Image_Url)}/>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 w-full'>
                            {dataCurItem.getProductById.Product_Image.map((itemImg,indexImg)=>(
                                <div className='w-full h-16' key={itemImg.Product_Image_ID}>
                                    <img className='w-full h-full rounded-lg' src={itemImg.Product_Image_Url} alt="" onClick={()=>setImgState(itemImg.Product_Image_Url)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-4 p-2 border border-black rounded-lg'>
                    <h1 className='text-xl font-semibold mb-10'>{dataCurItem.getProductById.Product_Name}</h1>
                    <div className='grid grid-cols-2 ml-12 mb-4 p-5 border-t-2 border-b-2 border-black'>
                        <div>
                            <div className='flex'>
                                <h1>Time left: </h1>
                                <h1>12h 30m</h1>
                            </div>
                            <div className='flex'>
                                <h1>Price:</h1>
                                <h1>US ${dataCurItem.getProductById.Price}</h1>
                            </div>
                        </div>
                        <button type='button' className='font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup hover:bg-textcolor transition-all'>Buy it now</button>
                    </div>
                    <div className='ml-12 p-5 border-t-2 border-b-2 border-black mb-4'>
                        <form className='grid grid-cols-2 items-center'>
                            <div className='flex h-fit'>
                                <h1 className='mr-5'>Bid</h1>
                                <div>
                                    <input type='text' className='w-32 h-7 rounded-xl outline-none px-3 border-black border-2'/>
                                    <p className='text-xs text-center'>Enter ${dataCurItem.getProductById.Price} or more</p>
                                </div>
                            </div>
                            <button type='submit' className='font-semibold w-44 text-xl  py-3 rounded-full bg-background-signup hover:bg-textcolor transition-all'>Bid now</button>
                        </form>
                    </div>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Description</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsa asperiores illo aliquid sapiente libero et quasi incidunt, doloremque nemo ea, nostrum, pariatur quod ipsam iste fugiat deserunt nihil harum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto alias quibusdam non minima facilis fugit numquam facere ipsa ullam, sunt velit libero molestiae animi in voluptate? Minima, omnis nemo. Laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor numquam quos illo, exercitationem quidem rem. Maiores nostrum velit dolorem eius facilis adipisci similique a beatae. Quod commodi officia dolore? Nobis.</p>
                    </div>
                </div>
            </div>
        )}
        <div>
            <h1 className='font-semibold text-xl'>Similar Item</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4'>
                {!loadingSimilar && dataSimilar.getSimilarProduct.map((itemSimi,indexSimi)=>(
                    <Link className='bg-link p-3 rounded-lg' key={itemSimi.Product_ID} to={`/item/${itemSimi.Product_ID}`}>
                        <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                            {itemSimi.Product_Image.map((itemSimiImg,indexSimiImg)=>(
                                <div className='row-span-2' key={itemSimiImg.Product_Image_ID}>
                                    <img src={itemSimiImg.Product_Image_Url} alt="" className='h-full rounded-lg'/>
                                </div>
                            ))}
                        </div>
                        <h1>Product Name: {itemSimi.Product_Name}</h1>
                        <h1>Price: {itemSimi.Price}</h1>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ItemCard