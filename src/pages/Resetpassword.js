import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { resetPassword } from '../schema/schemaindex'
import { ResetPassword } from '../graphql/mutation'
import { useMutation } from '@apollo/client'
const Resetpassword = () => {
    const navigate = useNavigate()
    const userid = localStorage.getItem('token')===null?"":JSON.parse(localStorage.getItem('token')).User_ID
    const [errorOtp, setErrorOtp] = useState('')
    const [Resetpassword, dataMutationReset] = useMutation(ResetPassword)
    const {values,errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues:{
        newpassword:'',
        confirmnewpassword:'',
        otpresetpassword:'',
      },
      validationSchema:resetPassword,
      onSubmit: async values=>{
        try {
          await Resetpassword({
            variables:{
              New_Password:values.newpassword,
              otp:values.otpresetpassword,
              User_ID:userid
            }
          })
        } catch (error) {
           console.log(error.message);
           setErrorOtp(error.message)
        }
      }
    })
    useEffect(()=>{
      if(!dataMutationReset.loading && dataMutationReset.called){
          if(dataMutationReset.error){
              // console.log(dataMutation.error.message);
          }
          else{ 
              localStorage.removeItem('token')
              // localStorage.setItem('token', dataMutation.data.signup.userId.id)
              navigate(`/signin`)
          }
      }
  },[dataMutationReset.loading, dataMutationReset.called, dataMutationReset.data,navigate,dataMutationReset.error])
  console.log(dataMutationReset);
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
          className="md:w-[40rem] w-3/4 mx-auto mt-9" onSubmit={handleSubmit}
        >
          <div className=" flex flex-col items-start mb-4">
            <label className="text-white mb-2 text-xs lg:text-base">
              New Password
            </label>
            <input
              className="w-full h-12 rounded-xl outline-none px-4 text-sm text-textcolor font-medium"
              placeholder="New password"
              type="password"
              name="newpassword"
              id="newpassword"
              value={values.newpassword}
              onChange = {handleChange}
              onBlur = {handleBlur}
            />
            {errors.newpassword && touched.newpassword && <p className='text-red-700 mt-1 text-xs'>{errors.newpassword}</p>}
          </div>
          <div className=" flex flex-col items-start mb-4">
            <label className="text-white mb-2 text-xs lg:text-base">
              Confirm New Password
            </label>
            <input
              className="w-full h-12 rounded-xl outline-none px-4 text-sm text-textcolor font-medium"
              placeholder="Confirm new password"
              type="password"
              name="confirmnewpassword"
              id="confirmnewpassword"
              value={values.confirmnewpassword}
              onChange = {handleChange}
              onBlur = {handleBlur}
            />
            {errors.confirmnewpassword && touched.confirmnewpassword && <p className='text-red-700 mt-1 text-xs'>{errors.confirmnewpassword}</p>}
          </div>
          <div className=" flex flex-col items-start mb-4">
            <label className="text-white mb-2 text-xs lg:text-base">
              OTP
            </label>
            <input
              className="w-full h-12 rounded-xl outline-none px-4 text-sm text-textcolor font-medium"
              placeholder="OTP"
              type="text"
              name="otpresetpassword"
              id="otpresetpassword"
              value={values.otpresetpassword}
              onChange = {(e)=>{
                  handleChange(e)
                  setErrorOtp('')
              }}
              onBlur = {handleBlur}
            />
            {errors.otpresetpassword && touched.otpresetpassword && <p className='text-red-700 mt-1 text-xs'>{errors.otpresetpassword}</p>}
            {(errorOtp && values.otpresetpassword && !errors.otpresetpassword) && (
                     <p className="text-red-700 mt-1 text-xs">
                        {errorOtp}
                    </p>
                )}
          </div>
          <button
            type="submit"
            className="transition ease-in-out duration-700 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-textcolor hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword
