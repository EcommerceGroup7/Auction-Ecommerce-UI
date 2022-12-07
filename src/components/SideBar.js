import React,{useState} from 'react'
import { useQuery } from '@apollo/client'
import {getListCategoryForSidebar} from '../graphql/queries'
import Submenu from './Submenu'
const Sidebar = () => {
    const {loading, error, data} = useQuery(getListCategoryForSidebar)
    console.log(data);
    const [subNav, setSubNav] = useState()
    const showSubNav = () => setSubNav(!subNav)
  return (
    <div className='sm:col-span-5 md:col-span-1 lg:col-span-1 h-fit mb-6'>
        <h1 className='text-xl font-semibold ml-4'>All Categories</h1>
        <div className='mx-4 mt-4'>
            {!loading && data.getListCatalog.map((item,index)=>(
                <Submenu key={item.Catalog_ID} item={item}/>
            ))}
        </div>
    </div>
  )
}

export default Sidebar