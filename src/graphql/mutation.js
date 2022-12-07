import { gql } from "@apollo/client";
const addUser = gql`
    mutation signup(
        $User_First_Name: String!, 
        $User_Last_Name:String!,
        $User_Name:String!,
        $Email:String!,
        $Password:String!,
        $PassWordConfirm:String!
    ) {
        signup(signupUserInput:{User_First_Name:$User_First_Name, User_Last_Name:$User_Last_Name,User_Name:$User_Name, Email:$Email, Password:$Password,PassWordConfirm:$PassWordConfirm}){
            userId{
                id
            }
            accessToken
        }
    }
`

const activeOTP = gql`
    mutation activeOtp(
        $otp:String!,
        $User_ID:String!
    ){
        activeOtp(activeOtpInput:{otp:$otp,User_ID:$User_ID})
    }
`

const login = gql`
    mutation login(
        $userNameorPassword:String!,
        $passWord:String!
    ){
        login(loginUserInput:{userNameorPassword:$userNameorPassword,passWord:$passWord}){
            userId{
                id
            }
            accessToken
        }
    }
` 

const resendOtp = gql`
    mutation resendOtp(
        $User_ID:String!,
    ){
        resendOtp(User_ID:$User_ID)
    }
`
const forgotPassword = gql`
    mutation forgotPassword(
        $email:String!
    ){
        forgotPassword(email:$email)
    }
`
const ResetPassword =  gql`
    mutation resetPassword(
        $New_Password:String!,
        $otp:String!,
        $User_ID:String!
    ){
        resetPassword(resetPasswordInput:{
            New_Password:$New_Password,
            otp:$otp,
            User_ID:$User_ID
        })
    }
`
export {addUser, activeOTP,login, resendOtp, forgotPassword, ResetPassword}