import React from 'react'
import Category from './Category'
import { useQuery } from '@apollo/client'
import { getPopulateCatalog } from '../graphql/queries'
import { useEffect } from 'react'
const Categories = () => {
  const { loading, error, data:dataCata } = useQuery(getPopulateCatalog)
  useEffect(()=>{

    console.log(dataCata);
  },[dataCata])
  return (
    <div className='mb-10'>
        <h1 className='mb-3 font-bold text-2xl'>Popular Categories</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center '>
          {!loading && dataCata.getPopulateCatalog.map((cate)=>(
            <Category key={cate.Catalog_ID} imgUrl={cate.Catalog_Image_Url} nameCate={cate.Catalog_Name} />
          ))}
        </div>
    </div>
  )
}

export default Categories