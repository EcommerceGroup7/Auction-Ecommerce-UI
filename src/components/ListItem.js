import React, { useEffect, useState ,useContext} from 'react'
import { useQuery } from '@apollo/client' 
import {getAuctioningProduct,searchAuctioningProduct,getAuctioningProductByCatalog, getMinTimeToDiscount} from '../graphql/queries'  
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../App'
import Countdown from './Countdown'
const ListItem = () => {
    const [page, setPage] = useState(0)
    const [pageSearch, setPageSearch] = useState(0)
    const [userId, setUserId] = useState('')
    const param = useParams()
    const {searchValue,setSearchValue} = useContext(UserContext)
    console.log(param)
    const {loading:loadingItem, error,data:dataItem, refetch:refetchProductCatalog} = useQuery(getAuctioningProductByCatalog,{
        variables:{
            Catalog_Name:param.cate
        }
    })
    const {loading:loadingAll, errorAll, data:dataAll, refetch} = useQuery(getAuctioningProduct)
    const {loading:loadingSearch, errors: errorsSearch, data:dataSearch, refetch:refetchSearch} = useQuery(searchAuctioningProduct,{
        variables:{
            Product_Name:searchValue,
        }
    })
    const {loading:loadingMinTime, errors:errorsMinTime, data:dataMinTime} = useQuery(getMinTimeToDiscount)
    useEffect(()=>{
        console.log(dataItem);
        console.log(dataAll);
        if(localStorage.getItem('token')===null){
            setUserId('')
        }
        else{
            // console.log(JSON.parse(localStorage.getItem('token')).userId.id)
            setUserId(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        refetch()
        const minInterval = setInterval(()=>{
            if(param.cate === 'all'){
                refetch()
            }
            else if((param.cate !== searchValue)){
                refetchProductCatalog({
                    Catalog_Name:param.cate
                })
            }
            else{
                refetchSearch({
                    Product_Name:searchValue,
                })
            }
        },(!loadingMinTime && dataMinTime.getMinTimeToDiscount*60*1000 + 1000))
        return ()=>clearInterval(minInterval)
    },[dataItem,dataAll,dataMinTime,loadingMinTime,searchValue,param.cate,refetchProductCatalog,refetchSearch,refetch])
  return (
    <div className='sm:col-span-5 md:col-span-4 lg:col-span-4 px-3 '>
        <div className='flex justify-between'>
            <h1 className='text-lg uppercase font-medium'>{param.cate} items</h1>
        </div>
        {param.cate === "all" ? (
            <React.Fragment>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                    {!loadingAll && dataAll.getAuctioningProduct.map((itemAll,indexAll)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemAll.Product_Auction_ID} to={userId===itemAll.User_ID.User_ID ? `/product/${itemAll.Product_ID.Product_ID}` :`/item/${itemAll.Product_Auction_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemAll.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                    </div>
                                ))}
                            </div>
                            <h1 className='text-lg font-semibold'>{itemAll.Product_ID.Product_Name}</h1>
                            <h1>Starting Price: <span className='font-semibold'>{itemAll.Starting_Price}$</span></h1>
                            <h1>Current Price: <span className='font-semibold'>{itemAll.Current_Price}$</span></h1>
                            <Countdown start={itemAll.Auction_Field_ID.Start_Time} end={itemAll.Auction_Field_ID.End_Time} />
                        </Link>
                    ))}
                </div>
            </React.Fragment>   
        ) : ((param.cate !== searchValue) ? (
                <React.Fragment>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                        {!loadingItem && dataItem.getAuctioningProductByCatalog.map((item,index)=>(
                            <Link className='bg-link p-3 rounded-lg' key={item.Product_Auction_ID} to={userId===item.User_ID.User_ID ? `/product/${item.Product_Auction_ID}` :`/item/${item.Product_Auction_ID}`}>
                                <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                    {item.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                        <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                            <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                        </div>
                                    ))}
                                </div>
                                <h1 className='text-lg font-semibold'>Product Name: {item.Product_ID.Product_Name}</h1>
                                <h1>Starting Price: <span className='font-semibold'>{item.Starting_Price}$</span></h1>
                                <h1>Current Price: <span className='font-semibold'>{item.Current_Price}$</span></h1>
                                <Countdown start={item.Auction_Field_ID.Start_Time} end={item.Auction_Field_ID.End_Time}/>
                            </Link>
                        ))}
                    </div>
                </React.Fragment>
        ):(
            <React.Fragment>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                    {!loadingSearch && dataSearch.searchAuctioningProduct.map((itemSearch,index)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemSearch.Product_Auction_ID} to={userId===itemSearch.User_ID.User_ID ? `/product/${itemSearch.Product_Auction_ID}` :`/item/${itemSearch.Product_Auction_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemSearch.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                    </div>
                                ))}
                            </div>
                            <h1 className='text-lg font-semibold'>Product Name: {itemSearch.Product_ID.Product_Name}</h1>
                            <h1>Starting Price: <span className='font-semibold'>{itemSearch.Starting_Price}$</span></h1>
                            <h1>Current Price: <span className='font-semibold'>{itemSearch.Current_Price}$</span></h1>
                            <Countdown start={itemSearch.Auction_Field_ID.Start_Time} end={itemSearch.Auction_Field_ID.End_Time}/>
                        </Link>
                    ))}
                </div>
            </React.Fragment>
        ))}
        
    </div>
  )
}

export default ListItem