import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { forgotPassword } from '../graphql/mutation'
import {getSingleEmailUser} from '../graphql/queries'
import { emailReset } from '../schema/schemaindex'
import { useQuery,useMutation } from '@apollo/client'
const Emailreset = () => {
  const navigate = useNavigate()
  const [errorResetEmail, setErrorResetEmail] = useState('')
  const [EamilResets, dataMutation] = useMutation(forgotPassword)
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      emailreset:'',
    },
    validationSchema: emailReset,
    onSubmit: async (values) => {
      try {
        await EamilResets({
          variables: {
            email: values.emailreset,
          },
        })
      } catch (error) {
        setErrorResetEmail(error.message)
        console.log(error.message)
      }
    },
  })
  const {loading,errors:errorGetSingle,data} = useQuery(getSingleEmailUser, {
    variables:{
      Email:values.emailreset
    }
  })  
  useEffect(() => {
    document.title = "FreshAuc - Email reset"
    if (!dataMutation.loading && dataMutation.called) {
      if (dataMutation.error) {
        console.log(dataMutation.error.message)
      } else {
        localStorage.setItem('token', !loading && JSON.stringify(data.getUserByEmail))
        navigate(`/resetpassword`)
      }
    }
    console.log(data);
  }, [
    dataMutation.loading,
    dataMutation.called,
    navigate,
    dataMutation.error,
    data,loading
  ])
  // console.log(data);
  return (
    <div className="bg-background-signup h-screen relative p-2">
      <div className="bg-signin absolute w-full h-full bg-cover opacity-20 top-0 left-0"></div>
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center w-full">
        <h1 className="font-logo text-7xl sm:text-9xl text-logo-color mb-4">
          FreshAuc
        </h1>
        <h3 className="font-sublogo text-2xl sm:text-4xl text-sub-logo-color">
          The Best Choice For You
        </h3>
        <form
          className="md:w-[40rem] w-3/4 mx-auto mt-9"
          onSubmit={handleSubmit}
        >
          <div className=" flex flex-col items-start mb-6">
            <label className="text-white mb-2 text-xs lg:text-base">
              Please enter the email to reset password
            </label>
            <input
              className="w-full h-12 rounded-xl outline-none px-4 text-sm text-textcolor font-medium"
              placeholder="Email"
              id="emailreset"
              name="emailreset"
              type="email"
              value={values.emailreset}
              onChange={(e)=>{
                  handleChange(e)
                  setErrorResetEmail('')
              }}
            />
            {errors.emailreset && (
              <p className="text-red-700 mx-auto mt-2 text-sm">{errors.emailreset}</p>
            )}
            {errorResetEmail && values.emailreset && !errors.emailreset && (
              <p className="text-red-700 mx-auto mt-2 text-sm">{errorResetEmail}</p>
            )}
          </div>
          <button
            type="submit"
            className="transition ease-in-out duration-700 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-textcolor hover:text-white"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default Emailreset
