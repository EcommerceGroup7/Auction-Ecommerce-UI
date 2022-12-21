import * as yup from "yup"

export const signUpValidation = yup.object().shape({
    firstname:yup.string().required('First Name is a required field'),
    lastname:yup.string().required('Last Name is a required field'),
    email:yup.string().email().required('Email is a required field').matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,"It should be a valid email address!"),
    username: yup.string().required("Username is a required field"),
    password:yup.string().min(6,"Password must be at least 6 characters").required('Password is a required field'),
    confirmpassword:yup.string().oneOf([yup.ref("password")], "Password must be match")
})

export const checKOtp = yup.object().shape({
    otp:yup.string().required('OTP is required')
})

export const signInValidation = yup.object().shape({
    usernameOrEmail:yup.string().required('Username or email is a required field'),
    password:yup.string().min(6,"Password must be at least 6 characters").required('Password is a required field'),
})

export const emailReset = yup.object().shape({
    emailreset:yup.string().email('It is not a valid email address!').required('Email is a required field').matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, "It should be a valid email address!"),
})
export const resetPassword = yup.object().shape({
    newpassword:yup.string().min(6,"Password must be at least 6 characters").required('Password is a required field'),
    confirmnewpassword:yup.string().oneOf([yup.ref("newpassword")], "Password must be match"),
    otpresetpassword:yup.string().required('OTP is required')
})
export const productAddValidation = yup.object().shape({
    productName:yup.string().required("Product name must have"),
    productWeight:yup.string().required("Product weight must have"),
    productPrice:yup.string().required("Product price must have"),
    productDesc:yup.string().required("Product description must have"),
    userInfo:yup.string().required("User info must have"),
})
export const newPassword = yup.object().shape({
    currentPass:yup.string().required('Current pass is a required field'),
    newPass:yup.string().min(6,"Password must be at least 6 characters").required('Password is a required field'),
    confirmPass:yup.string().oneOf([yup.ref("newPass")], "Password must be match"),
})
export const addAddress = yup.object().shape({
    addressName:yup.string().required('Must have a address name'),
    addressDistrict:yup.string().required('Must have address district'),
    recieverName:yup.string().required('Must have reciever name'),
    phone:yup.string().required('Must have phone')
})