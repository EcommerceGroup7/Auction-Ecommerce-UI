import React,{useEffect, useState} from 'react'
import {AiFillCamera,AiOutlineSearch,AiFillPlusCircle} from 'react-icons/ai'
import { BiChevronDown } from "react-icons/bi";
import Stack from '@mui/material/Stack';
import { TextField,Button, Modal,Box,Fab ,MenuItem} from '@mui/material';
import { useQuery,useMutation } from '@apollo/client';
import { getCatalogParent,getUserById} from '../graphql/queries';
import { createAddress } from '../graphql/mutation';
import axios from 'axios'
import { useFormik } from 'formik';

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
    const [userid, setUserid] = useState('')
    const [avatarUser,setAvatarUser] = useState('https://i.pinimg.com/736x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg')
    const [openModalChangePass, setOpenModalChangePass] = useState(false)
    const [openModalAddAddress, setOpenModalAddAddress] = useState(false)

    const [inputValueTest, setInputValueTest] = useState("");
    const [selectedTest, setSelectedTest] = useState("");
    const [openTest, setOpenTest] = useState(false); 

    const [dataDistrict, setDataDistrict] = useState(null)
    const [districtID, setDistrictID] = useState(0)
    const [district,setDistrict] = useState('')
    const [createAddressUser, dataMutation] = useMutation(createAddress,{
      refetchQueries:[
        {
          query:getUserById,
          variables:{
            User_ID:userid
          }
        }
      ]
    })
    const {loading,error,data} = useQuery(getCatalogParent)
    const {loading:loadingUser, error:errorUser, data:dataUser} = useQuery(getUserById,{

      variables:{
        User_ID:userid
      }

    })
    const {values:valuesAddress, error:errorAddress, handleChange:handleChangeAddress, handleSubmit:handleSubmitAddress} = useFormik({
      initialValues:{
        addressName:'',
        receiverName:'',
        phone:'',
      },
      onSubmit: async values=>{
        try{
          await createAddressUser({
            variables:{
              Address_Name:values.addressName,
              Address_District:district,
              Reciever_Name:values.receiverName,
              Phone:values.phone,
              District_ID:districtID,
            }
          })
        } 
        catch(err){
            console.log(err);
        }
      }
    })
    const getDataDistrict = async()=>{
        try {
            let res = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',{
                params:{
                    "province_id":202
                },
                headers:{
                    'Token':'48e7ac19-7c71-11ed-a2ce-1e68bf6263c5',
                    'Content-Type':'application/json'
                }
            })
            setDataDistrict(res.data)
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleOpenModalChangePass = () => setOpenModalChangePass(true);
    const handleCloseModalChangePass = () => setOpenModalChangePass(false);
    const handleOpenModalAddAddress = () => setOpenModalAddAddress(true);
    const handleCloseModalAddAddress = () => setOpenModalAddAddress(false);
    const handleChangDistrict = (e)=>{
        setDistrict(e.target.value)
    }
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
  useEffect(()=>{
    getDataDistrict()
    if(localStorage.getItem('token')===null){
      setUserid('')
    }
    else{
      setUserid(JSON.parse(localStorage.getItem('token')).userId.id)
    }
    if(!dataMutation.loading && dataMutation.called){
      if(dataMutation.error){
        console.log(dataMutation.error);
      }
      else{
        valuesAddress.addressName=''
        valuesAddress.phone=''
        valuesAddress.receiverName=''
        setDistrict('')
        setDistrictID(0)
        setOpenModalAddAddress(false)
      }
    }
    // getDataWard()
  },[dataMutation.loading,dataMutation.called,dataMutation.error])
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
                                      {!loadingUser && dataUser.getUserById.Address.map((item,index)=>(
                                          <li key={item.Address_ID} className={`p-2 text-sm hover:bg-background-signup hover:text-white ${item?.Address_Name?.toLowerCase()===selectedTest?.toLowerCase() && "bg-background-signup text-black"} ${item?.Address_Name?.toLowerCase().startsWith(inputValueTest) ? 'block' : 'hidden'}`}
                                              onClick={()=>{
                                                  if(item?.Address_Name?.toLowerCase()!==selectedTest.toLowerCase()){
                                                      setSelectedTest(item?.Address_Name);
                                                      setOpenTest(false);
                                                      setInputValueTest("");
                                                  }
                                              }}
                                          >{item.Address_Name}</li>
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
                                              <Box sx={style} noValidate >
                                                <form action="" onSubmit={handleSubmitAddress}>
                                                  <h1 className='text-center text-xl font-medium text-textcolor mb-2'>Add Address</h1>
                                                  <Stack className='mb-3'>
                                                      <TextField id="receiverName" name='receiverName' value={valuesAddress.receiverName} onChange={handleChangeAddress} label="Full Name" variant="outlined"/>
                                                  </Stack>
                                                  <Stack className='mb-3'> 
                                                      <TextField id="phone" name='phone' value={valuesAddress.phone} label="Phone number" onChange={handleChangeAddress} variant="outlined"/>
                                                  </Stack>
                                                  <Stack className='mb-3 gap-3'>
                                                        <TextField
                                                          id="demo-simple-select"
                                                          value={district}
                                                          label="District"
                                                          onChange={handleChangDistrict}
                                                          select
                                                          sx={{width:"100%"}}
                                                          
                                                        >
                                                          {dataDistrict ? dataDistrict.data.map((itemDistrict,indexDistrict)=>(
                                                            <MenuItem value={itemDistrict.DistrictName} onClick={()=>setDistrictID(itemDistrict.DistrictID)} key={itemDistrict.DistrictID}>{itemDistrict.DistrictName}</MenuItem>
                                                          )): <MenuItem disabled>Loading</MenuItem>}
                                                        </TextField>                                                                                                        
                                                  </Stack>
                                                  <Stack className='mb-3'>
                                                      <TextField id="addressName" name='addressName' value={valuesAddress.addressName} onChange={handleChangeAddress} label="Address" variant="outlined"/>
                                                  </Stack>
                                                  <div className='flex gap-2'>
                                                    <Button variant="contained" type='submit' style={{backgroundColor:"#F2AF92",height:"100%"}}>Add Address</Button>
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