import React, {useState,useEffect} from 'react'
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from '@apollo/client';
import { getCatalogParent , getSubCatalog} from '../graphql/queries';
const ModalUpdateProduct = ({isVisible,onClose}) => {
  const [imgShow,setImgShow] = useState([])
  const [baseImage, setBaseImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  
  const [inputSubValue, setInputSubValue] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [openSub, setOpenSub] = useState(false);
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
      setBaseImage(base64);
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
  useEffect(()=>{
      console.log(dataCatalog)
      console.log(dataSubCatalog);
  },[dataCatalog, dataSubCatalog])
  if(!isVisible) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
    <div className='w-[600px] flex flex-col'>
        <button className='text-whte text-xl place-self-end' onClick={()=>onClose()}>X</button>
        <div className='bg-white p-2 rounded max-h-[600px] overflow-y-auto' >
            <form>
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
                        <input type="file" className="opacity-0" 
                        // onChange={(e)=>uploadImage(e)}
                        />
                    </label>
                    {/* <div className='grid grid-cols-3 mt-3'>
                        {imgShow && imgShow.map((itemCate,indexItemCate)=>(
                            <img key={indexItemCate} src={itemCate} alt="ảnh sản phẩm" className='w-32 h-32 object-cover'/>
                        ))}
                    </div> */}
                </div>
                <div className='mb-4 mt-4'>
                    <div className='w-full font-medium relative'>
                        <div  onClick={() => setOpen(!open)} className={`bg-background-signup w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-800"}`}>
                            {selected ? selected?.length > 25 ? selected?.substring(0,25) + "..." :selected : "Select Category"}
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
                            {selectedSub ? selectedSub?.length > 25 ? selectedSub?.substring(0,25) + "..." :selectedSub : "Select Sub Category"}
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
                    <input type="text"  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Name *"/>
                </div>
                <div className='mb-4'>
                    <input type="number"  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Quantity *"/>
                </div>
                <div className='mb-4'>
                    <input type="number"  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Weight *"/>
                </div>
                <div className='mb-4'>
                    <input type="number"  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none' placeholder="Product Price *"/>
                </div>
                <div className='mb-4'>
                    <textarea  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Product Description *"
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <textarea  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-background-signup focus:outline-none"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="User Info *"
                    ></textarea>
                </div>
                <div>
                  <button type='submit' className='inline-block px-6 py-2.5 bg-background-signup text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-link hover:shadow-lg focus:bg-link focus:shadow-lg focus:outline-none focus:ring-0 active:bg-link active:shadow-lg transition duration-150 ease-in-out'>Update Product</button>
                </div>
            </form>
        </div>    
    </div> 
</div>
  )
}

export default ModalUpdateProduct