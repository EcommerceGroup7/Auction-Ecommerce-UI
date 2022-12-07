import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {MdKeyboardArrowDown} from 'react-icons/md'
const Submenu = ({item}) => {
    const [isOpen,setIsOpen] = useState(item.isOpened)
    const showOpen = ()=>setIsOpen(!isOpen)
  return (
        <div key={item.Catalog_ID}>
            <div className='flex items-center justify-between gap-6'>
                <Link className='hover:text-link' to={`/categories/${item.Catalog_Name}`}>{item.Catalog_Name}</Link>
                <div className='cursor-pointer' onClick={showOpen}>
                    <MdKeyboardArrowDown className='w-5 h-5'/>
                </div>
            </div>
            {isOpen &&(
                <div className='flex flex-col mb-3'>
                    {item.children.map((itemChild,indexChild)=>(
                        <Link className='ml-3 hover:text-link' key={itemChild.Catalog_ID} to={`/categories/${itemChild.Catalog_Name}`}>{itemChild.Catalog_Name}</Link>
                    ))}
                </div>
            )}
        </div>
  )
}

export default Submenu