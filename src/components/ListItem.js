import React, { useEffect, useState ,useContext} from 'react'
import { useQuery } from '@apollo/client' 
import {getProductByCatalogName, getAllProduct,searchProduct} from '../graphql/queries'  
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../App'
const ListItem = () => {
    const [page, setPage] = useState(0)
    const param = useParams()
    const {searchValue,setSearchValue} = useContext(UserContext)
    console.log(param)
    const {loading:loadingItem, error,data:dataItem} = useQuery(getProductByCatalogName,{
        variables:{
            Catalog_Name:param.cate
        }
    })
    const {loading:loadingAll, errorAll, data:dataAll} = useQuery(getAllProduct,{
        variables:{
            limit:12,
            offset:page*12
        }
    })
    const {loading:loadingSearch, errors: errorsSearch, data:dataSearch} = useQuery(searchProduct,{
        variables:{
          keywords:searchValue
        }
    })
    useEffect(()=>{
        console.log(dataItem);
        console.log(dataAll);
    },[dataItem,dataAll])
  return (
    <div className='sm:col-span-5 md:col-span-4 lg:col-span-4 px-3'>
        <div className='flex justify-between'>
            <h1>{param.cate}</h1>
            <div>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black">
                    <option defaultValue="">Sort by</option>
                    <option value="">Low to High</option>
                    <option value="">High to Low</option>
                </select>
            </div>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4'>
            {param.cate === "all" ? (
                <React.Fragment>
                    {!loadingAll && dataAll.getAllProduct.map((itemAll,indexAll)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemAll.Product_ID} to={`/item/${itemAll.Product_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemAll.Product_Image.map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-full rounded-lg'/>
                                    </div>
                                ))}
                            </div>
                            <h1>Product Name: {itemAll.Product_Name}</h1>
                            <h1>Price: {itemAll.Price}</h1>
                        </Link>
                    ))}
                     <div>
                        <button disabled={!page} onClick={()=>setPage(prev=>prev-1)}>Previous</button>
                        <button onClick={()=>setPage(prev=>prev+1)}>Next</button>
                    </div>
                </React.Fragment>   
            ) : ((param.cate !== searchValue) ? (
                    <React.Fragment>
                        {!loadingItem && dataItem.getProductByCatalogName.map((item,index)=>(
                            <Link className='bg-link p-3 rounded-lg' key={item.Product_ID} to={`/item/${item.Product_ID}`}>
                                <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                    {item.Product_Image.map((itemImg,indexItemImg)=>(
                                        <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                            <img src={itemImg.Product_Image_Url} alt="" className='h-full rounded-lg'/>
                                        </div>
                                    ))}
                                </div>
                                <h1>Product Name: {item.Product_Name}</h1>
                                <h1>Price: {item.Price}</h1>
                            </Link>
                        ))}
                    </React.Fragment>
            ):(
                <React.Fragment>
                    {!loadingSearch && dataSearch.searchProduct.map((itemSearch,index)=>(
                        <Link className='bg-link p-3 rounded-lg' key={itemSearch.Product_ID} to={`/item/${itemSearch.Product_ID}`}>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                {itemSearch.Product_Image.map((itemImg,indexItemImg)=>(
                                    <div className='row-span-2' key={itemImg.Product_Image_ID}>
                                        <img src={itemImg.Product_Image_Url} alt="" className='h-full rounded-lg'/>
                                    </div>
                                ))}
                            </div>
                            <h1>Product Name: {itemSearch.Product_Name}</h1>
                            <h1>Price: {itemSearch.Price}</h1>
                        </Link>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}

export default ListItem