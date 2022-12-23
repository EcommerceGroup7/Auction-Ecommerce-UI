import React, { useEffect ,useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import ShoppingCartItem from './ShoppingCartItem'
import LayoutCartAndBid from './LayoutCartAndBid'
import { useQuery } from '@apollo/client'
import { getUserOrder,userOrderTotal,getUserById } from '../graphql/queries'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
const ShoppingCart = () => {
    const navigate = useNavigate()
    const [userid,setUserid] = useState('')
    const {setCartValue} = useContext(UserContext)
    const {loading:loadingUserOrder, error:errorUserOrder, data:dataUserOrder, refetch} = useQuery(getUserOrder,{
        variables:{
            User_ID:userid
        }
    })
    const {loading:loadingUserTotal, error:errorUserTotal, data:dataUserTotal,refetch:refetchOrder} = useQuery(userOrderTotal,{
        variables:{
            User_ID:userid
        }
    })
    const {loading:loadingUser, error:errorUser, data:dataUser} = useQuery(getUserById,{
        variables:{
            User_ID:userid
        }
    })
    useEffect(()=>{
        if(localStorage.getItem('token')===null){
            setUserid('')
        }
        else{
            setUserid(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        refetch({
            User_ID:userid
        })
        refetchOrder({
            User_ID:userid
        })
        if(!loadingUser){
            if(dataUser.getUserById.Address.length ===0){
                alert("You don't have address, please add")
                navigate('/profile')
            }
        }
        setCartValue(!loadingUserOrder && dataUserOrder.getUserOrder.length)
    },[loadingUserOrder,dataUserOrder])
  return (
    <LayoutCartAndBid text="Cart">
        <div className='grid lg:grid-cols-5 gap-5'>
            <div className='col-span-4 h-max '>
                <div className='grid grid-cols-4 bg-background-signup rounded-t-2xl py-2 justify-items-center mb-3'>
                    <div className='font-semibold'>Image</div>
                    <div className='font-semibold'>
                        <h1>Product</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Price</h1>
                    </div>
                    <div className='font-semibold'>
                        <h1>Weight</h1>
                    </div>
                </div>
                {!loadingUserOrder && dataUserOrder.getUserOrder.map((itemUserOrder,indexUserOrder)=>(
                    <ShoppingCartItem key={itemUserOrder.Order_ID} img={itemUserOrder.Product_Auction_ID.Product_ID.Product_Image[0].Product_Image_Url} name={itemUserOrder.Product_Auction_ID.Product_ID.Product_Name} weight={itemUserOrder.Product_Auction_ID.Weight} total={itemUserOrder.Total_Price}/> 
                ))}
            </div>
            <div className='col-span-4 sm:col-span-4 lg:col-span-1 bg-background-signup px-7 pb-9 pt-4 rounded-2xl h-max'>
                <h1 className='text-center font-semibold text-2xl mb-4'>Summary</h1>
                <div className='mb-6'>
                    <div className='flex justify-between'>
                        <h3 className='font-medium'>Total:</h3>
                        <h3>${!loadingUserTotal && dataUserTotal.userOrderTotal.total}</h3>
                    </div>
                </div>
                <Link to={(!loadingUserTotal && dataUserTotal.userOrderTotal.total > 0) ? '/checkout' :''} className='text-center block bg-link px-5 py-2 rounded-2xl font-semibold'>Checkout</Link>
            </div>
        </div>
    </LayoutCartAndBid>
  )
}

export default ShoppingCart