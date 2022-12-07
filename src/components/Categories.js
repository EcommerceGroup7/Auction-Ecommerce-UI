import React from 'react'
import Category from './Category'
import { useQuery } from '@apollo/client'
import { getPopularCategories } from '../graphql/queries'
const Categories = () => {
  const { loading, error, data } = useQuery(getPopularCategories)
  console.log(data);
  return (
    <div className='mb-10'>
        <h1 className='mb-3 font-bold text-2xl'>Popular Categories</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center '>
          {!loading && data.getPopulateCatalog.map((cate)=>(
            <Category key={cate.Catalog_ID} imgUrl={cate.Catalog_Image_Url} nameCate={cate.Catalog_Name} />
          ))}
        </div>
    </div>
  )
}

export default Categories