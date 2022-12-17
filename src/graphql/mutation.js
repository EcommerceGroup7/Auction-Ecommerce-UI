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
            accessToken,
            userInfo{
                User_Name
            }
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
const createProductAuction = gql`
    mutation createProductAuction(
        $Weight:Float!,
        $Starting_Price:Float!,
        $Discount_Rate:Int!,
        $Product_ID:String!,
        $Auction_Field_ID:String!
    ){
        createProductAuction(CreateProductAuctionInput:{
            Weight:$Weight,
            Starting_Price:$Starting_Price,
            Discount_Rate:$Discount_Rate,
            Product_ID:$Product_ID,
            Auction_Field_ID:$Auction_Field_ID
        }){
            Product_Auction_ID
        }
    }
`
const createProduct = gql`
    mutation createProduct(
        $Product_Image:[Upload!],
        $Product_Name:String!,
        $Weight:Float!,
        $Price:Float!,
        $User_Note:String,
        $Product_Info:String,
        $Catalog_ID:String!
    ){
        createProduct(createProductInput:{
            Product_Image:$Product_Image,
            Product_Name:$Product_Name,
            Weight:$Weight,
            Price:$Price,
            User_Note:$User_Note,
            Product_Info:$Product_Info,
            Catalog_ID:$Catalog_ID,
        })
    }
`
const rechargeMoney = gql`
    mutation rechargeMoney($amount:Float!){
        rechargeMoney(amount:$amount){
            Total_Money
        }
    }
`
export {addUser, activeOTP,login, resendOtp, forgotPassword, ResetPassword,createProductAuction, createProduct, rechargeMoney}