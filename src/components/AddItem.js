import React ,{useEffect, useState}from 'react'
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery,useMutation } from '@apollo/client';
import { createProduct } from '../graphql/mutation';
import { getCatalogParent , getSubCatalog} from '../graphql/queries';
import { useFormik } from 'formik';
import { productAddValidation } from '../schema/schemaindex';
import { useNavigate } from 'react-router-dom';
const AddItem = () => {
    const navigate = useNavigate()
    const [imgShow,setImgShow] = useState([])
    const [baseImage, setBaseImage] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    const [inputSubValue, setInputSubValue] = useState("");
    const [selectedSub, setSelectedSub] = useState("");
    const [selectedSubID, setSelectedSubID] = useState("");
    const [openSub, setOpenSub] = useState(false);
    const [addProduct,dataMutation] = useMutation(createProduct)
    const {values, errors:errorsHandle, touched, handleBlur,handleChange,handleSubmit } = useFormik({
        initialValues:{
            productName:'',
            productWeight:'',
            productPrice:'',
            productDesc:'',
            userInfo:'',
        },
        validationSchema:productAddValidation,
        onSubmit: async values=>{
            try{
                await addProduct({
                    variables:{
                        Product_Image:baseImage,
                        Product_Name:values.productName,
                        Weight:values.productWeight,
                        Price:values.productPrice,
                        User_Note:values.userInfo,
                        Product_Info:values.productDesc,
                        Catalog_ID:selectedSubID
                    }
                }) 
            }
            catch(err){
                console.log(err.message);
            }
        }
       
    })

    const {loading:loadingCatalog, error: errorCatalog, data:dataCatalog} = useQuery(getCatalogParent)
    const {loading:loadingSubCatalog, error: errorSUbCatalog, data:dataSubCatalog} = useQuery(getSubCatalog,{
        variables:{
            Catalog_Name:selected && selected
        }
    })
    const uploadImage = async (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        setBaseImage([...baseImage,file]);
        setImgShow([...imgShow,base64])
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const deleteImg = (base64)=>{
        console.log(base64);
        setImgShow(imgShow.filter(items=>items!==base64))
    }
    useEffect(()=>{
        if(!dataMutation.loading && dataMutation.called){
            if(dataMutation.error){
                console.log(dataMutation.error.message);
            }
            else{
                // console.log(dataMutation.data.signup.accessToken);  
                // localStorage.setItem('token', dataMutation.data.signup.userId.id)
                navigate(`/product`)
            }
        }
        console.log(dataCatalog)
        console.log(dataSubCatalog);
    },[dataCatalog, dataSubCatalog,dataMutation.error,dataMutation.loading,dataMutation.called])
  return (
    <div className='mt-20 mb-10'>
        <form className='grid lg:grid-cols-6 gap-x-5 mb-4 pt-10' onSubmit={handleSubmit}>
            <div className='lg:col-span-2 h-fit mb-7'>
                <div className="flex items-center justify-center w-full flex-col">
                    <h1 className='text-lg font-medium mb-3'>Ảnh sản phẩm</h1>
                    <label 
                        className="flex flex-col justify-center w-full h-fit border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file</p>
                        </div>
                        <input type="file" className="opacity-0" onChange={uploadImage}/>
                    </label>
                    <div className='grid grid-cols-3 mt-3'>
                        {imgShow && imgShow.map((itemCate,indexItemCate)=>(
                            <img key={indexItemCate} onClick={()=>deleteImg(itemCate)} src={itemCate} alt="ảnh sản phẩm" className='w-32 h-32 object-cover'/>
                        ))}
                    </div>
                </div>
            </div>
            <div className='lg:col-span-4'>
                <div className='mb-4'>
                    <div className='w-full font-medium relative'>
                        <div  onClick={() => setOpen(!open)} className={`bg-background-signup w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-800"}`}>
                            {selected ? selected?.length > 25 ? selected?.substring(0,25) + "..." : selected : "Select Category"}
                            <BiChevronDown size={18} className={`${open&&"rotate-180"}`}/>
                        </div>
                        <ul className={`bg-link mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"} absolute top-9 left-0 w-full z-10`}>
                            <div className='flex items-center px-2 sticky top-0 bg-link'>
                                <AiOutlineSearch size={20} className="text-gray-700"/>
                                <input type="text" value={inputValue} placeholder='hellooo.....' className='placeholder:text-gray-700 p-2 outline-none bg-link' onChange={(e)=>setInputValue(e.target.value.toLowerCase())}/>
                            </div>
                            {!loadingCatalog && dataCatalog.getListCatalog.map((item,index)=>(
                                <li key={item.Catalog_ID} className={`p-2 text-sm hover:bg-background-signup hover:text-white ${item?.Catalog_Name?.toLowerCase()===selected?.toLowerCase() && "bg-background-signup text-black"} ${item?.Catalog_Name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
                                    onClick={()=>{
                                        if(item?.Catalog_Name?.toLowerCase()!==selected.toLowerCase()){
                                            setSelected(item?.Catalog_Name);
                                            setOpen(false);
                                            setInputValue("");
                                        }
                                    }}
                                >{item.Catalog_Name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='w-full font-medium relative'>
                        <div  onClick={() => setOpenSub(!openSub)} className={`bg-background-signup w-full p-2 flex items-center justify-between rounded ${!selectedSub && "text-gray-800"}`}>
                            {selectedSub  ? selectedSub?.length > 25 ? selectedSub?.substring(0,25) + "..." :selectedSub : "Select Sub Category"}
                            <BiChevronDown size={18} className={`${openSub&&"rotate-180"}`}/>
                        </div>
                        <ul className={`bg-link mt-2 overflow-y-auto ${openSub ? "max-h-60" : "max-h-0"} absolute top-9 left-0 w-full`}>
                            <div className='flex items-center px-2 sticky top-0 bg-link'>
                                <AiOutlineSearch size={20} className="text-gray-700"/>
                                <input type="text" value={inputSubValue} placeholder='hellooo.....' className='placeholder:text-gray-700 p-2 outline-none bg-link' onChange={(e)=>setInputSubValue(e.target.value.toLowerCase())}/>
                            </div>
                            {!loadingSubCatalog && dataSubCatalog.getSubCatalogByName.map((itemSub,index)=>(
                                <li key={itemSub.Catalog_ID} className={`p-2 text-sm hover:bg-background-signup hover:text-white ${itemSub?.Catalog_Name?.toLowerCase()===selectedSub?.toLowerCase() && "bg-background-signup text-black"} ${itemSub?.Catalog_Name?.toLowerCase().startsWith(inputSubValue) ? 'block' : 'hidden'}`}
                                    onClick={()=>{
                                        if(itemSub?.Catalog_Name?.toLowerCase()!==selectedSub.toLowerCase()){
                                            setSelectedSub(itemSub?.Catalog_Name);
                                            setSelectedSubID(itemSub.Catalog_ID);
                                            setOpenSub(false);
                                            setInputSubValue("");
                                        }
                                    }}
                                >{itemSub.Catalog_Name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mb-4'>
                    <input value={values.productName} onChange={handleChange} id='productName' name='productName' type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Name *"/>
                </div>
                <div className='mb-4'>
                    <input id='productWeight' value={values.productWeight} onChange={handleChange}  name='productWeight' type="number" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Weight *"/>
                </div>
                <div className='mb-4'>
                    <input id='productPrice' value={values.productPrice} onChange={handleChange} name='productPrice' type="number" className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Price *"/>
                </div>
                <div className='mb-4'>
                    <textarea value={values.productDesc} onChange={handleChange} name='productDesc' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none"
                    id="productDesc"
                    rows="3"
                    placeholder="Product Description *"
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <textarea value={values.userInfo} onChange={handleChange} name='userInfo' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none"
                    id="userInfo"
                    rows="3"
                    placeholder="User Info *"
                    ></textarea>
                </div>
                <button type="submit" className="inline-block px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded hover:text-black hover:bg-link focus:bg-link focus:outline-none focus:ring-0 active:bg-link transition duration-150 ease-in-out">Create Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddItem