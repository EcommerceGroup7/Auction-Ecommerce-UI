import React, { useEffect, useState ,useContext} from 'react'
import { useQuery } from '@apollo/client' 
import {getAuctioningProduct,searchAuctioningProduct,getAuctioningProductByCatalog, getMinTimeToDiscount} from '../graphql/queries'  
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../App'
import Countdown from './Countdown'
const ListItem = () => {
    const [page, setPage] = useState(0)
    const [pageSearch, setPageSearch] = useState(0)
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
        },(!loadingMinTime && dataMinTime.getMinTimeToDiscount*60*1000 + 1500))
        return ()=>clearInterval(minInterval)
    },[dataItem,dataAll])
  return (
    <div className='sm:col-span-5 md:col-span-4 lg:col-span-4 px-3 '>
        <div className='flex justify-between'>
            <h1 className='text-lg uppercase font-medium'>{param.cate} items</h1>
            <div>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black">
                    <option defaultValue="">Sort by</option>
                    <option value="">Low to High</option>
                    <option value="">High to Low</option>
                </select>
            </div>
        </div>
        {param.cate === "all" ? (
            <React.Fragment>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                    {!loadingAll && dataAll.getAuctioningProduct.map((itemAll,indexAll)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemAll.Product_Auction_ID} to={`/item/${itemAll.Product_Auction_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemAll.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                    </div>
                                ))}
                            </div>
                            <h1>Product Name: {itemAll.Product_ID.Product_Name}</h1>
                            <h1>Starting Price: {itemAll.Starting_Price}$</h1>
                            <h1>Current Price: {itemAll.Current_Price}$</h1>
                            <Countdown start={itemAll.Auction_Field_ID.Start_Time} end={itemAll.Auction_Field_ID.End_Time} />
                        </Link>
                    ))}
                </div>
            </React.Fragment>   
        ) : ((param.cate !== searchValue) ? (
                <React.Fragment>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                        {!loadingItem && dataItem.getAuctioningProductByCatalog.map((item,index)=>(
                            <Link className='bg-link p-3 rounded-lg' key={item.Product_Auction_ID} to={`/item/${item.Product_Auction_ID}`}>
                                <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                    {item.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                        <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                            <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                        </div>
                                    ))}
                                </div>
                                <h1>Product Name: {item.Product_ID.Product_Name}</h1>
                                <h1>Starting Price: {item.Starting_Price}</h1>
                                <h1>Current Price: {item.Current_Price}</h1>
                                <Countdown start={item.Auction_Field_ID.Start_Time} end={item.Auction_Field_ID.End_Time}/>
                            </Link>
                        ))}
                    </div>
                </React.Fragment>
        ):(
            <React.Fragment>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
                    {!loadingSearch && dataSearch.searchAuctioningProduct.map((itemSearch,index)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemSearch.Product_Auction_ID} to={`/item/${itemSearch.Product_Auction_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemSearch.Product_ID.Product_Image.slice(0,2).map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-32 w-80 rounded-lg object-cover'/>
                                    </div>
                                ))}
                            </div>
                            <h1>Product Name: {itemSearch.Product_ID.Product_Name}</h1>
                            <h1>Starting Price: {itemSearch.Starting_Price}</h1>
                            <h1>Current Price: {itemSearch.Current_Price}</h1>
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