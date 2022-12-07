import React, { useEffect,useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { addUser } from '../graphql/mutation'
import { signUpValidation } from '../schema/schemaindex'
const Signup = () => {
    const nagative = useNavigate()
    const [sameEmail, setSameEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState('')
    const [sameUser, setSameUser] = useState('')
    const [checkUser, setCheckUser] = useState('')
    const [addUserSignUp, dataMutation] = useMutation(addUser)
    const {values,errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            firstname:'',
            lastname:'',
            email:'',
            username:'',
            password:'',
            confirmpassword:''
        },
        validationSchema:signUpValidation,
        onSubmit:async values=>{
            try{
                // console.log(values);
                await addUserSignUp({
                        variables:{
                        User_First_Name:values.firstname,
                        User_Last_Name:values.lastname,
                        User_Name:values.username,
                        Email:values.email,
                        Password:values.password,
                        PassWordConfirm:values.confirmpassword
                    }
                })
            }
            catch(err){
                console.log(err.message);
                if(err.message.includes('email'))
                {
                    setSameEmail(err.message)
                }
                else{
                    setSameUser(err.message)
                }
            }
            setCheckEmail(values.email)
            setCheckUser(values.username)
        }
    })

    useEffect(()=>{
        if(!dataMutation.loading && dataMutation.called){
            if(dataMutation.error){
                // console.log(dataMutation.error.message);
            }
            else{
                // console.log(dataMutation.data.signup.accessToken);  
                localStorage.setItem('token', JSON.stringify(dataMutation.data.signup))
                // localStorage.setItem('token', dataMutation.data.signup.userId.id)
                nagative(`/otp`)
            }
        }

        // console.log(dataMutation);
    },[dataMutation.loading, dataMutation.called, dataMutation.data,nagative,dataMutation.error,dataMutation])
    return (
    <div>
        <div className='grid grid-col-1 md:grid-cols-2'>
            <div className='bg-background-signup h-screen relative'>
                <div className='bg-signin absolute w-full h-full bg-cover opacity-20 top-0 left-0'></div>
                <div className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center w-full'>
                    <h1 className='font-logo text-7xl md:text-9xl text-logo-color mb-4'>FreshAuc</h1>
                    <h3 className='font-sublogo text-2xl md:text-4xl text-sub-logo-color'>The Best Choice For You</h3>
                </div>
            </div>
            <div className='bg-background-signup flex justify-center items-center'>
                <div className='flex justify-center items-center flex-col bg-textcolor p-4 lg:p-10 rounded-2xl my-3 mx-4'>
                <h1 className='font-roboto text-4xl lg:text-5xl text-white font-semibold mb-3'>SIGN UP</h1>
                    <h4 className='font-roboto text-md lg:text-lg text-white font-semibold mb-5'>SIGN UP AND START YOUR AUCTION</h4>
                    <form className='text-center flex flex-col' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <input placeholder='First Name' id='firstname' type='text' name='firstname' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.firstname} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.firstname && touched.firstname && <p className='text-red-700 mt-1 text-xs'>{errors.firstname}</p>}
                        </div>
                        <div className='mb-4'>
                            <input placeholder='Last Name' id='lastname' type='text' name='lastname' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.lastname} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.lastname && touched.lastname && <p className='text-red-700 mt-1 text-xs'>{errors.lastname}</p>}
                        </div>
                        <div className='mb-4'>
                            <input placeholder='Email' id='email' type='email' name='email' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                            { errors.email && touched.email && <p className='text-red-700 mt-1 text-xs'>{errors.email}</p>}
                            {(checkEmail===values.email && !errors.email) && <p className='text-red-700 mt-1 text-xs'>{sameEmail}</p>}
                        </div>
                        <div className='mb-4'>    
                            <input placeholder='Username' id='username' type='text' name='username' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.username && touched.username && <p className='text-red-700 mt-1 text-xs'>{errors.username}</p>}
                            {(checkUser===values.username && !errors.username) && <p className='text-red-700 mt-1 text-xs'>{sameUser}</p>}
                        </div>
                        <div className='mb-4'>
                            <input placeholder='Password' id='password' type='password' name='password' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.password && touched.password && <p className='text-red-700 mt-1 text-xs'>{errors.password}</p>}
                        </div>
                        <div className='mb-4'>   
                            <input placeholder='Confirm Password' id='confirmpassword' type='password' name='confirmpassword' className='py-2 placeholder:text-xs lg:placeholder:text-sm placeholder:text-textcolor outline-none w-80 px-5 h-12 text-sm text-textcolor font-medium rounded-full' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.confirmpassword && touched.confirmpassword && <p className='text-red-700 mt-1 text-xs'>{errors.confirmpassword}</p>}
                        </div>
                        <button type='submit' className='transition ease-in-out duration-300 bg-white w-32 py-2 px-5 h-12 text-md text-textcolor font-medium rounded-full mx-auto hover:bg-background-signup hover:text-white mb-2'>Register</button>
                        <p className='text-sm'>Have you had account? <Link className='text-white font-semibold' to='/signin'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup