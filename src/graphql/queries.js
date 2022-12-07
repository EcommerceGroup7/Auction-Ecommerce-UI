import { gql } from "@apollo/client";
const getSingleEmailUser = gql`
    query getUserByEmail ($Email:String!){
        getUserByEmail(Email:$Email){
            User_ID
        }
    }
`
const getPopularCategories = gql`
    query getPopulateCatalog{
        getPopulateCatalog{
            Catalog_ID,
            Catalog_Name,
            Catalog_Id_Ref{
                __typename
            },
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
            Quantity,
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
    query searchProduct($keywords:String!){
        searchProduct(keywords:$keywords){
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
export {getSingleEmailUser, getPopularCategories, getListCategoryForSidebar,getProductByCatalogName,getAllProduct, getProductById, getSimilarProduct,searchProduct}