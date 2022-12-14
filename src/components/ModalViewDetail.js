import React from 'react'

const ModalViewDetail = ({isVisibleDetail, onCloseDetail,test}) => {
    if (!isVisibleDetail) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
        <div className='w-[600px] flex flex-col'>
            <button className='text-whte text-xl place-self-end' onClick={()=>onCloseDetail()}>X</button>
            <div className='bg-white p-4 rounded'>
                <h1 className='text-center mb-4'>Order View</h1>
                <h2 className='py-3 border-b-8 border-background-signup'>Order Code: kjjajksdkad</h2>
                <h2 className='py-3 border-b-8 border-background-signup'>Order Code: kjjajksdkad</h2>
                <h2>Shop name</h2>
                <div className='flex gap-2 py-3 border-b-8 border-background-signup'>
                    <div className='w-32'>
                        <img className='w-full' src="https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1" alt="" />
                    </div>
                    <div className=''>
                        <p className='contents'>Product Name: </p>
                    </div>
                </div>
                <h2 className='py-3'>Order Code: {test}</h2>
                <h2 className='py-3'>Order Code: kjjajksdkad</h2>
                <h2 className='py-3'>Order Code: kjjajksdkad</h2>
            </div>    
        </div> 
    </div>
  )
}

export default ModalViewDetail