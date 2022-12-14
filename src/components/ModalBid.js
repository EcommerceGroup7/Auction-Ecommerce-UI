import React,{useEffect, useState} from 'react'
import { useQuery,useMutation } from '@apollo/client'
import { getAvailableAuctionField } from '../graphql/queries'
import { createProductAuction } from '../graphql/mutation'
import { useFormik } from 'formik'
import * as yup from "yup"
const ModalBid = ({isVisible, onClose,dataShowModal}) => {
    const createProductAuctionValidation = yup.object().shape({
        weight:yup.number().min(0,'Min value 0').required('Must have value'),
        starting_Price:yup.number().required('Must have a price'),
        discount_Rate:yup.number().required("Must have a discount Rate")
    })
    const [timer, setTimer] = useState('')
    const [auctionField, setAuctionField] = useState('')
    const {loading, error, data} = useQuery(getAvailableAuctionField)
    const [createProductAuctionBid,dataMutation] = useMutation(createProductAuction)
    const {values,errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            weight:'',
            starting_Price:'',
            discount_Rate:'',
        },
        validationSchema:createProductAuctionValidation,
        onSubmit:async values=>{
            try{
                await createProductAuctionBid({
                    variables:{
                        Weight:values.weight,
                        Starting_Price:values.starting_Price,
                        Discount_Rate:values.discount_Rate,
                        Product_ID:dataShowModal.Product_ID,
                        Auction_Field_ID:auctionField
                    }
                })
                console.log(values);
            }
            catch(err){
                console.log(err.message);
            }
        }
    })
    const onHandleClickAuctionField = (auctionID,time) =>{
        setTimer(time)
        setAuctionField(auctionID)
    }
    useEffect(()=>{
        console.log(data);
    },[data])
    if(!isVisible) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
        <div className='w-[800px] flex flex-col'>
            <button className='text-whte text-xl place-self-end' onClick={()=>onClose()}>X</button>
            <div className='bg-white p-2 rounded max-h-[600px] overflow-y-auto'>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className='text-center font-semibold text-3xl mb-4'>Start Auction: {dataShowModal.Product_Name}</h1>
                    <div className='mb-4'>
                        <input type="number" id='weight' max={dataShowModal.Weight} name='weight' value={values.weight} onChange={handleChange} className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder={`Product Weight to Auction less than ${dataShowModal.Weight} *`}/>
                        {errors.weight && touched.weight && <p className='text-red-700 mt-1 text-xs'>{errors.weight}</p>}
                    </div>
                    <div className='mb-4'>
                        <input type="number"  id='starting_Price' name='starting_Price' value={values.starting_Price} onChange={handleChange} className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Starting Price to Auction *"/>
                        {errors.starting_Price && touched.starting_Price && <p className='text-red-700 mt-1 text-xs'>{errors.starting_Price}</p>}
                    </div>
                    <div className='mb-4'>
                        <input type="number" id="discount_Rate" name='discount_Rate' value={values.discount_Rate} onChange={handleChange} className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Discount Rate to Auction *"/>
                        {errors.discount_Rate && touched.discount_Rate && <p className='text-red-700 mt-1 text-xs'>{errors.discount_Rate}</p>}
                    </div>
                    <div className='mb-4'>
                        <h1>Auction Field</h1>
                        <div>
                            {!loading && data.getAvailableAuctionField.map((itemTimer,indexTimer)=>{
                                // const stringStart = itemTimer.Start_Time.toString()
                                const dateStart = new Date(itemTimer.Start_Time)
                                const dateEnd = new Date(itemTimer.End_Time)
                                return(
                                    <button type='button' key={itemTimer.Auction_Field_ID} onClick={()=>onHandleClickAuctionField(itemTimer.Auction_Field_ID,`${dateStart.toString().slice(4,24)} - ${dateEnd.toString().slice(4,24)}`)} className={`${timer === `${dateStart.toString().slice(4,24)} - ${dateEnd.toString().slice(4,24)}` ? 'bg-link' : 'bg-white'} mr-3 inline-block border-background-signup px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg transition duration-150 ease-in-out`}>{dateStart.toString().slice(4,24)} - {dateEnd.toString().slice(4,24)}, {itemTimer.Discount_Circle} minutes</button>
                                )
                            })}
                            {/* <button onClick={()=>setTimer('23/01/2022, 14:45:20 - 24/01/2022, 14:45:20')} className={`${timer === '23/01/2022, 14:45:20 - 24/01/2022, 14:45:20' ? 'bg-link' : 'bg-white'} mr-3 inline-block border-background-signup px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg transition duration-150 ease-in-out`}>23/01/2022, 14:45:20 - 24/01/2022, 14:45:20</button> */}
                        </div>
                    </div>
                    <button disabled={!loading && data.getAvailableAuctionField.length===0 ? true : false} type='submit' className='inline-block border-background-signup px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg transition duration-150 ease-in-out bg-white'>Add to Product Bid</button>
                    {!loading && data.getAvailableAuctionField.length===0 ? <p className='text-red-700'>Không thể lên sàn được thì không có Auction Field</p> : ''}
                </form>
            </div>
        </div>
    </div>
  )
}

export default ModalBid