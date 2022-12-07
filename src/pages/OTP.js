import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { activeOTP, resendOtp } from '../graphql/mutation'
import { checKOtp} from '../schema/schemaindex'
import { useFormik } from 'formik'
const OTP = () => {
  const navigate = useNavigate()
  const getToken = JSON.parse(localStorage.getItem('token'))
  const [otpCode, setOtpCode] = useState('')
  const [errorOtp, setErrorOtp] = useState('') 
  const [activeOTPCode, dataMutation] = useMutation(activeOTP)
  const [resendOTPCode, dataMutationOtp] = useMutation(resendOtp)
  const {values,errors, handleChange, handleSubmit} = useFormik({
    initialValues:{
      otp:''
    },

    validationSchema:checKOtp,
    onSubmit: async values=>{
        try{
            await activeOTPCode({
            variables:{
              otp:values.otp,
              User_ID:getToken.userId.id
            }
          })
        }
        catch(err){
          console.log(err.message);
          setErrorOtp(err.message)
        }
        setOtpCode(values.otp)
    }
  })
  const resendOtpCode = async() =>{
    try {
      await resendOTPCode({
        variables:{
          User_ID:getToken.userId.id
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    if(!dataMutation.loading && dataMutation.called){
      // console.log(dataMutation.data.signup.userId.id);  
      if(dataMutation.error){
        console.log(dataMutation.error.message);
      }
      else{
        localStorage.removeItem('token')
        navigate(`/signin`)
      }
    }
  },[dataMutation.loading, dataMutation.called, dataMutation.data,navigate,dataMutation.error])
  console.log(dataMutation);
  console.log(dataMutationOtp);
  return (
    <div className='bg-background-signup h-screen relative p-2'>
      <div className='bg-signin absolute w-full h-full bg-cover opacity-20 top-0 left-0'></div>
      <div className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center w-full'>
          <h1 className='font-logo text-7xl sm:text-9xl text-logo-color mb-4'>FreshAuc</h1>
          <h3 className='font-sublogo text-2xl sm:text-4xl text-sub-logo-color'>The Best Choice For You</h3>
          <form className='md:w-[40rem] w-3/4 mx-auto mt-9' onSubmit={handleSubmit}>
              <div className=' flex flex-col items-start mb-6'>
                <label className='text-white mb-2 text-xs lg:text-base'>Please enter the OTP code to to login</label>
                <input className='w-full h-12 rounded-xl outline-none px-4 text-sm text-textcolor font-medium' placeholder='OTP...' type="text" name='otp' id='otp'  value={values.otp} onChange={handleChange}/>
                {errors.otp && <p className='text-red-700 mt-1 text-xs'>{errors.otp}</p>}
                {(otpCode === values.otp && !errors.otp)&&  <p className='text-red-700 mt-1 text-xs'>{errorOtp}</p>}
              </div>
              <button type='submit' className='transition ease-in-out duration-700 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-textcolor hover:text-white'>Submit</button>
          </form>
          <br></br>
          <button className='transition ease-in-out duration-700 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-textcolor hover:text-white' onClick={resendOtpCode}>Resend OTP</button>
      </div>
    </div>
  )
}

export default OTP