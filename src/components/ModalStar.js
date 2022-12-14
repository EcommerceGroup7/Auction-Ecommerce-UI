import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'
const ModalStar = ({isVisibleStar, onCloseStar}) => {
    const [rating, setRating] = useState(null)
    const [hover,setHover] = useState(null)
    if (!isVisibleStar) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
        <div className='w-[600px] flex flex-col'>
            <button className='text-whte text-xl place-self-end' onClick={()=>onCloseStar()}>X</button>
            <form className='bg-white p-2 rounded'>
                <h1 className='text-center'>Product Name: jadakdasn</h1>

                <div className='flex items-center justify-center'>
                    <h1>Product Quality: </h1>
                    <div className='flex justify-center'>
                        {[...Array(5)].map((star,index)=>{
                            const ratingValue = index + 1
                            return(
                                <label key={index}>
                                    <input className='hidden' type='radio' name='rating' value={ratingValue} onClick={()=>setRating(ratingValue)}/>
                                    <FaStar onMouseLeave={()=>setHover(null)} onMouseEnter={()=>setHover(ratingValue)} className='cursor-pointer' color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} size={20}/>
                                </label>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h1>Your comment</h1>
                    <div className='mb-4'>
                        <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Your comment"
                        ></textarea>
                    </div>
                </div>
                <button type='submit' className='block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out'>Send</button>        
            </form>    
        </div> 
    </div>
  )
}

export default ModalStar