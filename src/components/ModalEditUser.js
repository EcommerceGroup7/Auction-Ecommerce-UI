import React,{useState} from 'react'
import {AiFillCamera,AiOutlineSearch,AiFillPlusCircle} from 'react-icons/ai'
import { BiChevronDown } from "react-icons/bi";
import Stack from '@mui/material/Stack';
import { TextField,Button, Modal,Typography,Box,Fab } from '@mui/material';
import { newPassword } from '../schema/schemaindex';
import { useFormik } from 'formik';
import { useQuery } from '@apollo/client';
import { getCatalogParent , getSubCatalog} from '../graphql/queries';

const ModalEditUser = ({isVisible,onClose}) => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:550,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius:2
    };
    const [avatarUser,setAvatarUser] = useState('https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg')
    const [openModalChangePass, setOpenModalChangePass] = useState(false)
    const [openModalAddAddress, setOpenModalAddAddress] = useState(false)

    const [inputValueTest, setInputValueTest] = useState("");
    const [selectedTest, setSelectedTest] = useState("");
    const [openTest, setOpenTest] = useState(false); 

    const {loading,error,data} = useQuery(getCatalogParent)
    const {values:valuesPass, errors:errorsPass, touched:touchedPass, handleSubmit:handleSubmitPass, handleChange:handleChangePass} = useFormik({
      initialValues:{
        currentPass:'',
        newPass:'',
        confirmPass:''
      },
      validationSchema:newPassword,
    })
    const handleOpenModalChangePass = () => setOpenModalChangePass(true);
    const handleCloseModalChangePass = () => setOpenModalChangePass(false);
    const handleOpenModalAddAddress = () => setOpenModalAddAddress(true);
    const handleCloseModalAddAddress = () => setOpenModalAddAddress(false);
    const uploadImage = async (e) => {
      console.log(e.target.files);
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setAvatarUser(base64)
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
    if(!isVisible) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10'>
        <div className='w-[800px] flex flex-col'>
            <button className='text-whte text-xl place-self-end' onClick={()=>onClose()}>X</button>
            <div className='bg-white p-2 rounded'>
              <h1 className='text-center'>Edit</h1>
              <div className='flex'>
                  <div className='w-52'>
                    <div className='w-40 h-40 relative mx-auto mb-3'>
                      <img src={avatarUser} alt="" className='w-full h-full object-cover rounded-full border'/>
                      <label htmlFor="avatarChanges">
                        <AiFillCamera className='absolute cursor-pointer bottom-5 right-2' size={20}/>
                      </label>
                      <input type="file" className='hidden' name="" id="avatarChanges" onChange={(e)=>uploadImage(e)}/>
                    </div>
                  </div>
                  <div className='flex-1 grid grid-cols-2 gap-2'>
                      <Stack spacing={3}>
                          <TextField id="outlined-basic" label="First Name" variant="outlined"/>
                      </Stack>
                      <Stack spacing={3}>
                          <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
                      </Stack>
                      <Stack spacing={3}>
                          <TextField id="outlined-basic" label="Email" variant="outlined" type="email"/>
                      </Stack>
                      <Stack spacing={3}>
                          <TextField id="outlined-basic" label="Phone" variant="outlined"/>
                      </Stack>
                      <Stack spacing={3}>
                          <TextField id="outlined-basic" label="Shop Name" variant="outlined"/>
                      </Stack>
                      <Stack spacing={3}>
                        <Button variant="contained" onClick={handleOpenModalChangePass} style={{backgroundColor:"#F2AF92",height:"100%"}}>Change Password</Button>
                        <Modal
                          open={openModalChangePass}
                          onClose={handleCloseModalChangePass}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                              <form action="">
                                <h1 className='text-center text-xl font-medium text-textcolor mb-2'>Change password</h1>
                                <Stack spacing={3} className='mb-3'>
                                    <TextField id="outlined-basic" label="Current password" variant="outlined"/>
                                </Stack>
                                <Stack spacing={3} className='mb-3'>
                                    <TextField id="outlined-basic" label="New password" variant="outlined"/>
                                </Stack>
                                <Stack spacing={3} className='mb-3'>
                                    <TextField id="outlined-basic" label="Confirm new password" variant="outlined"/>
                                </Stack>
                                <div className='flex gap-2'>
                                  <Button variant="contained" type='submit' style={{backgroundColor:"#F2AF92",height:"100%"}}>Save</Button>
                                  <Button variant="contained" type='button' onClick={handleCloseModalChangePass} style={{backgroundColor:"#F2AF92",height:"100%"}}>Close</Button>
                                </div>
                              </form>
                            </Box>
                        </Modal>
                      </Stack>
                      <div className='col-span-2'>
                          <div className='mb-4'>
                              <div className='w-full font-medium relative'>
                                  <div  onClick={() => setOpenTest(!openTest)} className={`bg-background-signup w-full p-2 flex items-center justify-between rounded ${!selectedTest && "text-gray-800"}`}>
                                      {selectedTest ? selectedTest?.length > 25 ? selectedTest?.substring(0,25) + "..." : selectedTest : "Select Category"}
                                      <BiChevronDown size={18} className={`${openTest&&"rotate-180"}`}/>
                                  </div>
                                  <ul className={`bg-link mt-2 overflow-y-auto ${openTest ? "max-h-60" : "max-h-0"} absolute top-9 left-0 w-full z-10`}>
                                      <div className='flex items-center px-2 sticky top-0 bg-link'>
                                          <AiOutlineSearch size={20} className="text-gray-700"/>
                                          <input type="text" value={inputValueTest} placeholder='hellooo.....' className='placeholder:text-gray-700 p-2 outline-none bg-link' onChange={(e)=>setInputValueTest(e.target.value.toLowerCase())}/>
                                      </div>
                                      {!loading && data.getListCatalog.map((item,index)=>(
                                          <li key={item.Catalog_ID} className={`p-2 text-sm hover:bg-background-signup hover:text-white ${item?.Catalog_Name?.toLowerCase()===selectedTest?.toLowerCase() && "bg-background-signup text-black"} ${item?.Catalog_Name?.toLowerCase().startsWith(inputValueTest) ? 'block' : 'hidden'}`}
                                              onClick={()=>{
                                                  if(item?.Catalog_Name?.toLowerCase()!==selectedTest.toLowerCase()){
                                                      setSelectedTest(item?.Catalog_Name);
                                                      setOpenTest(false);
                                                      setInputValueTest("");
                                                  }
                                              }}
                                          >{item.Catalog_Name}</li>
                                      ))}
                                      <div>
                                          <Fab sx={{backgroundColor:'#F2AF92',margin:"10px","&:hover":{backgroundColor:"transparent"}}} size='small' color="primary" aria-label="add">
                                            <AiFillPlusCircle size={25}/> 
                                          </Fab>
                                          <button onClick={handleOpenModalAddAddress}>
                                            Add Address
                                          </button>
                                          <Modal
                                            open={openModalAddAddress}
                                            onClose={handleCloseModalAddAddress}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                          >
                                              <Box sx={style}>
                                                <form action="">
                                                  <h1 className='text-center text-xl font-medium text-textcolor mb-2'>Change Adđ</h1>
                                                  <Stack spacing={3} className='mb-3'>
                                                      <TextField id="outlined-basic" label="Current password" variant="outlined"/>
                                                  </Stack>
                                                  <Stack spacing={3} className='mb-3'>
                                                      <TextField id="outlined-basic" label="New password" variant="outlined"/>
                                                  </Stack>
                                                  <Stack spacing={3} className='mb-3'>
                                                      <TextField id="outlined-basic" label="Confirm new password" variant="outlined"/>
                                                  </Stack>
                                                  <div className='flex gap-2'>
                                                    <Button variant="contained" type='submit' style={{backgroundColor:"#F2AF92",height:"100%"}}>Save</Button>
                                                    <Button variant="contained" type='button' onClick={handleCloseModalAddAddress} style={{backgroundColor:"#F2AF92",height:"100%"}}>Close</Button>
                                                  </div>
                                                </form>
                                              </Box>
                                          </Modal>
                                      </div>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>    
        </div> 
    </div>
  )
}

export default ModalEditUser