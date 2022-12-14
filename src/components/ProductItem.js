import React,{useState} from 'react'
import ModalUpdateProduct from './ModalUpdateProduct'
const ProductItem = () => {
    const [showModal, setShowModal] = useState(false)
    const [imgState, setImgState] = useState("https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1")
  return (
    <div className='mt-20 mb-10'>
        <div className='grid lg:grid-cols-6 gap-x-2 mb-4'>
            <div className='lg:col-span-2 h-fit items-center w-full  p-2 border border-black rounded-lg'>
                <div className='grid lg:grid-cols-1 justify-items-center '>
                    <div className='w-full h-[268px] mb-1  '>
                        <img className='w-full h-full rounded-lg' src="https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1" alt="" onClick={()=>setImgState("https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1")}/>
                    </div>
                    <div className='grid grid-cols-4 gap-x-1 w-full'>
                        
                            <div className='w-full h-16'>
                                <img className='w-full h-full rounded-lg' src="https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1" alt="" onClick={()=>setImgState("https://th.bing.com/th/id/OIP.J210Mr8pa86JeKJCIFwV7AHaFM?pid=ImgDet&rs=1")}/>
                            </div>
                        
                    </div>
                </div>
            </div>
            <div className='lg:col-span-4 '>
                <div className='p-2 border border-black rounded-lg mb-3'>
                    <h1 className='text-xl font-semibold mb-2'>czcascsc</h1>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Weight: asdasda</h1>
                    </div>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Quantity:</h1>
                    </div>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Price: </h1>
                    </div>
                    <div className='ml-12 px-5'>
                        <h1 className='font-semibold text-xl'>Description</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsa asperiores illo aliquid sapiente libero et quasi incidunt, doloremque nemo ea, nostrum, pariatur quod ipsam iste fugiat deserunt nihil harum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto alias quibusdam non minima facilis fugit numquam facere ipsa ullam, sunt velit libero molestiae animi in voluptate? Minima, omnis nemo. Laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor numquam quos illo, exercitationem quidem rem. Maiores nostrum velit dolorem eius facilis adipisci similique a beatae. Quod commodi officia dolore? Nobis.</p>
                    </div>
                </div>
                <div>
                    <button onClick={()=>setShowModal(true)} className='mr-3 inline-block px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg focus:bg-link focus:shadow-lg focus:outline-none focus:ring-0 active:bg-link active:shadow-lg transition duration-150 ease-in-out'>Update</button>
                </div>
            </div>
        </div>
        <ModalUpdateProduct isVisible={showModal} onClose={()=>setShowModal(false)}/>
    </div>
  )
}

export default ProductItem