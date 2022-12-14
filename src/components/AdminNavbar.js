import React, { useState,useEffect } from 'react'
import {BiSearchAlt2,BiUser} from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {IoIosNotifications} from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom'
const AdminNavbar = () => {
  const [checkUser, setCheckUser] = useState(false)
  const [openModalUser, setOpenModalUser] = useState(false)
  const [userName,setUserName] = useState('')
  const navigate = useNavigate()
  const onSearchSubmit =  (e) =>{
    e.preventDefault()
    // navigate(`/categories/${searchValue}`)
    // setSearchValue('')
  }
  const isLogOut = () =>{
        localStorage.removeItem('token')
        setCheckUser(false)
        navigate(`/`)
  }
  useEffect(() => {
    if(localStorage.getItem('token')===null)
    {
      setCheckUser(false)
      setUserName('')
    }
    else{
      setCheckUser(true)
      setUserName(JSON.parse(localStorage.getItem('token')).userInfo.User_Name)
    }
  }, [])
  const openModal = ()=>{
    setOpenModalUser(!openModalUser)
  }
  return (
    <header className="z-10 mb-2 px-2 shadow bg-background-signup fixed top-0 left-0 w-full">
      <div className="relative mx-auto flex flex-col px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center text-3xl font-black" to="/dashboard">
          <h1 className='font-logo text-logo-color'>FreshAuc Admin</h1>
        </Link>
        <input className="peer hidden" type="checkbox" id="navbar-open" />
        <label
          className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.88em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0"
        >
          <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8 items-center">
            <li className="mt-2 sm:mt-0">
                <div className='sm:relative cursor-pointer '>
                    <BiUser className='w-full h-7 text-center' onClick={openModal}/>
                    {openModalUser && (

                        <div className='sm:absolute sm:-left-[450%] sm:text-right text-center sm:top-[200%] '>
                        <ul className='w-40 bg-textcolor p-4 rounded-xl'>
                            <li className='text-lg font-semibold p-1 rounded-lg'>
                                <h1>{userName}</h1>
                            </li>
                            <li className='hover:bg-link p-1 rounded-lg' onClick={isLogOut}>
                                <span>Logout</span>
                            </li>
                        </ul>
                        </div>
                    )}
                </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AdminNavbar
