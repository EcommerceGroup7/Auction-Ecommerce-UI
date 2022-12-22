import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { login } from '../graphql/mutation'
import { useFormik } from 'formik'
import { signInValidation } from '../schema/schemaindex'
const Signin = () => {
  const navigate = useNavigate()
  
  const [loginUser, dataMutation] = useMutation(login)
  const [errorUserOrEmail, setErrorUserOrEmail] = useState('')
  const [errorPass, setErrorPass] = useState('')
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
        usernameOrEmail: '',
        password: '',
    },
    validationSchema: signInValidation,
    onSubmit: async (values) => {
      try {
        console.log(values)
        await loginUser({
          variables: {
            userNameorPassword: values.usernameOrEmail,
            passWord: values.password,
          },
        })
        
      } catch (error) {
        if (error.message.includes('user')) {
          setErrorUserOrEmail(error.message)
        } else {
          setErrorPass(error.message)
        }
      }
    },
  })

  useEffect(() => {
    document.title = "FreshAuc - Signin"
    if (!dataMutation.loading && dataMutation.called) {
      if (dataMutation.error) {
        console.log(dataMutation.error.message)
      } else {
        localStorage.setItem('token', JSON.stringify(dataMutation.data.login))
        console.log(dataMutation.data.login.userId.id)
        if(dataMutation.data.login.userInfo.isAdmin){

          navigate(`/dashboard`)
        }
        else{
          navigate('/')
        }
      }
    }
  }, [
    dataMutation.loading,
    dataMutation.called,
    dataMutation.data,
    navigate,
    dataMutation.error,
  ])
  // console.log(dataMutation)
  return (
    <div>
      <div className="grid grid-col-1 md:grid-cols-2">
        <div className="bg-background-signup h-screen relative">
          <div className="bg-signin absolute w-full h-full bg-cover opacity-20 top-0 left-0"></div>
          <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center w-full">
            <h1 className="font-logo text-7xl md:text-9xl text-logo-color mb-4">
              FreshAuc
            </h1>
            <h3 className="font-sublogo text-2xl md:text-4xl text-sub-logo-color">
              The Best Choice For You
            </h3>
          </div>
        </div>
        <div className="bg-background-signup flex justify-center items-center">
          <div className="flex justify-center items-center flex-col bg-textcolor p-4 lg:p-10 rounded-2xl my-3 mx-4">
            <h1 className="font-roboto text-4xl lg:text-5xl text-white font-semibold mb-3">
              SIGN IN
            </h1>
            <h4 className="font-roboto text-md lg:text-lg text-white font-semibold mb-5">
              SIGN IN AND START YOUR AUCTION
            </h4>
            <form className="text-center flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Username or Email"
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  className="py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full"
                  value={values.usernameOrEmail}
                  onChange={(e)=>{
                        handleChange(e)
                        setErrorUserOrEmail('')
                  }}
                  onBlur={handleBlur}
                />
                {errors.usernameOrEmail && touched.usernameOrEmail && (
                  <p className="text-red-700 mt-1 text-xs">
                    {errors.usernameOrEmail}
                  </p>
                )}
                {(errorUserOrEmail && values.usernameOrEmail && !errors.usernameOrEmail) && (
                     <p className="text-red-700 mt-1 text-xs">
                        {errorUserOrEmail}
                    </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  className="py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full"
                  value={values.password}
                  onChange={(e)=>{
                        handleChange(e)
                        setErrorPass('')
                  }}
                  onBlur={handleBlur}
                />
                 {errors.password && touched.password && (
                  <p className="text-red-700 mt-1 text-xs">
                    {errors.password}
                  </p>
                )}
                 {(errorPass && values.password && !errors.password) && (
                     <p className="text-red-700 mt-1 text-xs">
                        {errorPass}
                    </p>
                )}
              </div>
              <div className="flex justify-between mb-5">
                <Link className="text-xs font-semibold text-white" to="/signup">
                  Create a new account
                </Link>
                <Link
                  className="text-xs font-semibold text-white"
                  to="/emailreset"
                >
                  Forget your password ?
                </Link>
              </div>
              <button
                type="submit"
                className="transition ease-in-out duration-300 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-background-signup hover:text-white "
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
