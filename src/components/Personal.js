import React, { useState } from 'react'
import {AiFillCamera} from 'react-icons/ai'
import {FaStar} from 'react-icons/fa'
import ModalEditUser from './ModalEditUser';
import ModalStar from './ModalStar';
import ModalViewDetail from './ModalViewDetail';
const Personal = () => {
  const [avatar, setAvatar] = useState('https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg')
  const [showModal, setShowModal] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [showModalStar, setShowModalStar] = useState(false)
  const [dataModal, setDataModal] = useState(null)
  const test1 = "test1"
  const test2 = "test2"
  const test3 = "test3"
  const handleDataModal = (data) =>{
    setShowModalDetail(true)
    setDataModal(data)
  }
  return (
    <div className='mt-20 mb-10'>
        <h1>User Profile</h1>
        <div className='grid lg:grid-cols-7 gap-x-5 mb-4 pt-10'>
            <div className='lg:col-span-2 w-max-full border-2 rounded p-2 mb-4'>
                <div className='w-40 h-40 relative mx-auto mb-3'>
                  <img src={avatar} alt="" className='w-full h-full object-cover rounded-full border'/>
                </div>
                <h1 className='text-center mb-3 font-medium text-lg'>Name of Usser</h1>
                <button onClick={()=>setShowModal(true)} className="block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out">Edit</button>
                <ModalEditUser isVisible={showModal} onClose={()=>setShowModal(false)}/>
            </div>
            <div className='lg:col-span-5 border-2 rounded p-2 mb-4'>
              <h1 className='text-2xl text-link font-semibold mb-2'>Information of User</h1>
              <div>
                <h1 className='text-lg text-textcolor font-medium'>First Name: </h1>
                <h1 className='text-lg text-textcolor font-medium'>Last Name: </h1>
                <h1 className='text-lg text-textcolor font-medium'>Email: </h1>
                <h1 className='text-lg text-textcolor font-medium'>Phone: </h1>
                <h1 className='text-lg text-textcolor font-medium'>Shop Name:</h1>
                <h1 className='text-lg text-textcolor font-medium'>Address: </h1>
              </div>
            </div>
        </div>
        <div className='grid lg:grid-cols-1 gap-x-2 mb-4 pt-10'>
            <div className='mb-4'>
              <h1>Rate Product</h1>
              <div className='flex gap-2 border-2 rounded p-2 flex-wrap justify-evenly'>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer' onClick={()=>setShowModalStar(true)}>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                  <div className='flex justify-center'>
                    {[...Array(5)].map((star,index)=>{
                      const ratingValue = index + 1
                      return(
                        <FaStar size={20} key={index} color={ratingValue <= 3 ? '#ffc107' : "#e4e5e9"}/>
                      )
                    })}
                  </div>
                </div>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer '>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className=''>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                </div>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer '>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className=''>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                </div>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer '>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className=''>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                </div>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer '>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className=''>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                </div>
                <div className=' p-2 border border-black rounded w-[280px] cursor-pointer '>
                  <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                  <div>
                    <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                    <h1 className=''>Shop Name: akjdasldjasldjldasda</h1>
                  </div>
                </div>
                <ModalStar isVisibleStar={showModalStar} onCloseStar={()=>setShowModalStar(false)}/>
              </div>
            </div>
              
            <div className=''>
              <h1>Completed</h1>
              <div className='flex gap-2 border-2 rounded p-2 flex-wrap justify-evenly'>
                  <div className=' p-2 border border-black rounded w-[280px] '>
                      <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                      <div>
                        <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                      </div>
                      <button onClick={()=>handleDataModal(test1)} className='block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out'>View Details</button>
                     
                  </div>
                  <div className=' p-2 border border-black rounded w-[280px] '>
                      <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                      <div>
                        <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                      </div>
                      <button onClick={()=>handleDataModal(test2)} className='block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out'>View Details</button>
                      
                  </div>
                  <div className=' p-2 border border-black rounded w-[280px] '>
                      <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                      <div>
                        <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                      </div>
                      <button onClick={()=>handleDataModal(test3)} className='block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out'>View Details</button>
                      
                  </div>
                  <div className=' p-2 border border-black rounded w-[280px] '>
                      <img className='rounded lg:h-52 w-full' src="https://th.bing.com/th/id/R.276d7432bf296bce8978a242205c15ec?rik=kCJ5i%2bRI8NggMQ&pid=ImgRaw&r=0" alt="" />
                      <div>
                        <h1 className='mb-2'>Product Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                        <h1 className='mb-2'>Shop Name: akjdasldjasldjldasda</h1>
                      </div>
                      <button className='block mx-auto px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out'>View Details</button>
                  </div>
                  <ModalViewDetail isVisibleDetail={showModalDetail} onCloseDetail={()=>setShowModalDetail(false)} test={dataModal}/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Personal