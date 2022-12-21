import { gql } from "@apollo/client";
const getSingleEmailUser = gql`
    query getUserByEmail ($Email:String!){
        getUserByEmail(Email:$Email){
            User_ID
        }
    }
`
const getPopulateCatalog = gql`
    query getPopulateCatalog{
        getPopulateCatalog{
            Catalog_ID,
            Catalog_Name,
            Catalog_Image_Url
        }
    }
`
const getListCategoryForSidebar = gql`
    query getListCatalog{
        getListCatalog{
            Catalog_ID,
            Catalog_Name,
            children{
                Catalog_ID,
                Catalog_Name,
            }	
            isOpened
        }
    }
`
const getProductByCatalogName = gql`
    query getProductByCatalogName($Catalog_Name:String!){
        getProductByCatalogName(Catalog_Name:$Catalog_Name){
            Product_ID,
            Product_Name,
            Price,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url
            }
        }
    }
`
const getAllProduct = gql`
    query getAllProduct($limit:Int!,$offset:Int!){
        getAllProduct(paginationInput:{
            limit:$limit,
            offset:$offset
        }){
            Product_ID,
            Product_Name,
            Price,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url
            }  
        }
    }
`
const getProductById = gql`
    query getProductById($Product_ID:String!){
        getProductById(Product_ID:$Product_ID){
            Product_ID,
            Product_Name,
            Weight,
            Price,
            User_Note,
            Product_Info,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url,
            }
        }
    }
`
const getSimilarProduct = gql`
    query getSimilarProduct($Product_ID:String!){
        getSimilarProduct(Product_ID:$Product_ID){
            Product_ID,
            Product_Name,
            Price,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url
            }
        }
    }
`
const searchProduct = gql`
    query searchProduct($keywords:String!,$limit:Int!,$offset:Int!){
        searchProduct(searchProductInput:{
            keywords:$keywords,
            limit:$limit,
            offset:$offset
        }){
            Product_ID,
            Product_Name,
            Price,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url
            }
        }
    }
`
const getCatalogParent = gql`
    query getListCatalog{
        getListCatalog{
            Catalog_ID,
            Catalog_Name
        }
    }
`
const getSubCatalog = gql`
    query getSubCatalogByName($Catalog_Name:String!){
        getSubCatalogByName(Catalog_Name:$Catalog_Name){
            Catalog_ID,
            Catalog_Name
        }
    }
`
const getOperatingAuctionField = gql`
    query getOperatingAuctionField{
        getOperatingAuctionField{
            Auction_Field_ID,
            Start_Time,
            End_Time,
            Discount_Circle
        }
    }
`
const getAvailableAuctionField = gql`
    query getAvailableAuctionField{
        getAvailableAuctionField{
            Auction_Field_ID,
            Start_Time,
            End_Time,
            Discount_Circle
        }
    }
`
const getProductByUser = gql`
    query getProductByUser($User_ID:String!){
        getProductByUser(User_ID:$User_ID){
            Product_ID,
            Product_Name,
            Price,
            Product_Image{
                Product_Image_ID,
                Product_Image_Url
            },
            Weight
        }
    }
`
const getAuctioningProduct = gql`
    query getAuctioningProduct{
        getAuctioningProduct{
            Product_Auction_ID,
            User_ID{
                User_ID
            },
            Starting_Price,
            Current_Price,
            Discount_Rate,
            isSold,
            Auction_Field_ID{
                Auction_Field_ID,
                Start_Time,
                End_Time,
                Discount_Circle,
                isOperation
            },
            Product_ID{
                Product_ID,
                Product_Name,
                Product_Image{
                    Product_Image_ID,
                    Product_Image_Url
                }
            }
        }
    }
`
const searchAuctioningProduct = gql`
    query searchAuctioningProduct($Product_Name:String!){
        searchAuctioningProduct(Product_Name:$Product_Name){
            Product_Auction_ID,
            Starting_Price,
            Current_Price,
            Discount_Rate,
            isSold,
            User_ID{
                User_ID
            },
            Auction_Field_ID{
                Auction_Field_ID,
                Start_Time,
                End_Time,
                Discount_Circle,
                isOperation
            },
            Product_ID{
                Product_ID,
                Product_Name,
                Product_Image{
                    Product_Image_ID,
                    Product_Image_Url
                }
            }
        }
    }
`
const getAuctioningProductByCatalog = gql`
    query getAuctioningProductByCatalog($Catalog_Name:String!){
        getAuctioningProductByCatalog(Catalog_Name:$Catalog_Name){
            Product_Auction_ID,
            Starting_Price,
            Current_Price,
            Discount_Rate,
            isSold,
            User_ID{
                User_ID
            },
            Auction_Field_ID{
                Auction_Field_ID,
                Start_Time,
                End_Time,
                Discount_Circle,
                isOperation
            },
            Product_ID{
                Product_ID,
                Product_Name,
                Product_Image{
                    Product_Image_ID,
                    Product_Image_Url
                }
            }
        }
    }
`
const getProductAuctionById = gql`
    query getProductAuctionById($Product_Auction_ID:String!){
        getProductAuctionById(Product_Auction_ID:$Product_Auction_ID){
            Product_Auction_ID,
            Starting_Price,
            Current_Price,
            Discount_Rate,
            isSold,
            Auction_Field_ID{
                Auction_Field_ID,
                Start_Time,
                End_Time,
                Discount_Circle,
                isOperation
            },
            Product_ID{
                Product_ID,
                Product_Name,
                Product_Image{
                    Product_Image_ID,
                    Product_Image_Url
                },
                Product_Info
            }
        }
    }
`
const getSimilartProductAuction = gql`
    query getSimilartProductAuction($Product_Auction_ID:String!){
        getSimilartProductAuction(Product_Auction_ID:$Product_Auction_ID){
            Product_Auction_ID,
            Starting_Price,
            Current_Price,
            Discount_Rate,
            isSold,
            User_ID{
                User_ID
            },
            Auction_Field_ID{
                Auction_Field_ID,
                Start_Time,
                End_Time,
                Discount_Circle,
                isOperation
            },
            Product_ID{
                Product_ID,
                Product_Name,
                Product_Image{
                    Product_Image_ID,
                    Product_Image_Url
                }
            }
        }
    }
`
const getMinTimeToDiscount = gql`
    query getMinTimeToDiscount{
        getMinTimeToDiscount
    }
`
const getCurrentByUser = gql`
    query getCurrentByUser($User_ID:String!){
        getCurrentByUser(User_ID:$User_ID){
            Currency_ID,
            Total_Money
        }
    }
`
const getLastCurrencyLog = gql`
    query getLastCurrencyLog($User_ID:String!){
        getLastCurrencyLog(User_ID:$User_ID){
            Currency_Log_ID,
            Currency_Log_Value,
        }
    }
`
const getCurrentBid = gql`
    query getCurrentBid($Product_Auction_ID:String!, $User_ID:String!){
        getCurrentBid(getCurrentBidInput:{
            Product_Auction_ID:$Product_Auction_ID,
            User_ID:$User_ID
        }){
            User_ID,
            Product_Auction_ID,
            Price,
            Time
        }
    }
`
const getUserById = gql`
    query getUserById($User_ID:String!){
        getUserById(User_ID:$User_ID){
            User_ID,
            User_First_Name,
            User_Last_Name,
            User_Name,
            Email,
            Phone,
            Address{
                Address_ID,
                Reciever_Name,
                Phone,
                Address_Name,
                Address_District,
                District_ID
            },
            Default_Address_ID{
                Address_ID
                Reciever_Name,
                Phone,
                Address_Name,
                Address_District,
                District_ID
            }
            Shop_Name,
            User_Image_Url,
        }
    }
`
const getUserOrder = gql`
    query getUserOrder($User_ID:String!){
        getUserOrder(User_ID:$User_ID){
            Order_ID,
            Total_Price,
            Status,
            Product_Auction_ID{
                Product_ID{
                    Product_Name,
                    Product_Image{
                        Product_Image_Url
                    }
                }
                Weight,
            },
            Address_ID{
                District_ID
            }
        }
    }
`
const getLastestPayment = gql`
    query getLastestPayment($Payment_ID:String!){
        getLastestPayment(Payment_ID:$Payment_ID){
            Payment_ID,
            Total,
        }
    }
`
const getUserBidding = gql`
    query getUserBidding($User_ID:String!){
        getUserBidding(User_ID:$User_ID){
            Product_Auction{
                Product_Auction_ID,
                Current_Price,
                Product_ID{
                    Product_Name,
                    Product_Image{
                    Product_Image_Url
                    }
                }
            },
            Price,
            Time
        }
    }
`
export {getSingleEmailUser, 
        getPopulateCatalog, 
        getListCategoryForSidebar,
        getProductByCatalogName,
        getAllProduct, 
        getProductById, 
        getSimilarProduct,
        searchProduct,
        getCatalogParent, 
        getSubCatalog, 
        getOperatingAuctionField,
        getProductByUser,
        getAvailableAuctionField,
        getAuctioningProduct,
        searchAuctioningProduct,
        getAuctioningProductByCatalog,
        getProductAuctionById,
        getSimilartProductAuction, 
        getMinTimeToDiscount,
        getCurrentByUser,
        getLastCurrencyLog,
        getCurrentBid,
        getUserById,
        getUserOrder,
        getLastestPayment,
        getUserBidding
}