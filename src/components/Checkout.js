import React,{useState,useEffect} from 'react'
import {FaCcPaypal} from 'react-icons/fa'
import {IoWallet} from 'react-icons/io'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField,MenuItem,Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useQuery, useMutation } from '@apollo/client';
import { getUserById, getUserOrder, getCurrentByUser,userOrderTotal } from '../graphql/queries';
import { createAddress,createPayment } from '../graphql/mutation';
import { useFormik } from 'formik';
import { addAddress } from '../schema/schemaindex';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Checkout = () => {
    const paymentMethod = [
        {
            id:'wallet',
            title:"From your digital wallet",
        },
        {
            id:'paypal',
            title:`From paypal`,
        }
    ]
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [open, setOpen] = useState(false);
    const [openModalAddAddress, setOpenModalAddAddress] = useState(false)
    const [paymentMethods, setPaymentMethods] = useState('')
    const [dataDistrict, setDataDistrict] = useState(null)
    const [districtIds,setDistrictIds] = useState(0)
    const [districtIdsChange,setDistrictIdsChange] = useState(0)
    
    const [totalShip, setTotalShip] = useState(0)
    const [totalItem,setTotalItem] = useState(0)
    const [totalWeight,setTotalWeight] = useState(0)
    const [addressNameChange, setAddressNameChange] = useState('')
    const [phoneChange, setPhoneChange] = useState('')
    const [receiverNameChange, setReceiverNameChange] = useState('')
    const [districtChange, setDistrictChange] = useState('')
    const [addressId,setAddressId] = useState('')
    const [arrOrderId, setArrOrderId] = useState([])

    const {loading:loadingUser, error:errorUser, data:dataUser} = useQuery(getUserById,{
        variables:{
          User_ID:userId
        }
    })
    const {loading:loadingUserOrder,error:errorUserOrder, data:dataUserOrder} = useQuery(getUserOrder,{
        variables:{
            User_ID:userId
          }
    })
    const {loading:loadingCurrency, error:errorCurrency, data:dataCurrency} = useQuery(getCurrentByUser,{
        variables:{
            User_ID:userId
        }
    })
    const {loading:loadingOrderTotal, error:errorOrderTotal, data:dataOrderTotal} = useQuery(userOrderTotal,{
        variables:{
            User_ID:userId
        }
    })
    const [createAdd, dataMutationAddress] = useMutation(createAddress,{
        refetchQueries:[
            {
                query:getUserById,
                variables:{
                    User_ID:userId
                }
            }
        ]
    })
    const [createOrderPayment, dataMutationOrder] = useMutation(createPayment)
    const {values, errors:errorAddress, touched, handleChange,handleSubmit} = useFormik({
        initialValues:{
            addressName:'',
            addressDistrict:'',
            recieverName:'',
            phone:'',
            districtId:districtIds
        },
        validationSchema:addAddress,
        onSubmit:async values=>{
            try{
                await createAdd({
                    variables:{
                        Address_Name:values.addressName,
                        Address_District:values.addressDistrict,
                        Reciever_Name:values.recieverName,
                        Phone:values.phone,
                        District_ID:districtIds
                    }
                })
            }
            catch(err){
                console.log(err.message);
            }
        }

    })
    const {values:valuesPayment, errors:errorsPayment,touched:touchedPayment, handleChange:handleChangePayment, handleSubmit:handleSubmitPayment} = useFormik({
        initialValues:{
            orderid:arrOrderId,
            totalItem:((totalShip / 23730)+totalItem),
            methodPayment:paymentMethods
        },
        onSubmit: async ()=>{
            try{

                await createOrderPayment({
                    variables:{
                        Order_ID:arrOrderId,
                        total:((totalShip / 23730) + totalItem) ,
                        method:paymentMethods
                    }
                })
                
            }
            catch(err){
                console.log(err.message);
            }
        }
    })
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeAddress = (e)=>{
        console.log(e.target.value);
    }
    const handleClickAddress = (address,district,receiver,phone,id,districtId)=>{
        setAddressNameChange(address)
        setDistrictChange(district)
        setReceiverNameChange(receiver)
        setPhoneChange(phone)
        setAddressId(id)
        setDistrictIdsChange(districtId)
    }
    const handleSubmitAddress = (e)=>{
        e.preventDefault()
    }
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
    const getShipFee = async()=>{
        let data = JSON.stringify({
            "from_district_id": 3695,
            "service_id": 53320,
            "to_district_id": districtIdsChange === 0 ? !loadingOrderTotal && dataOrderTotal.userOrderTotal.Address_ID.District_ID : districtIdsChange,
            "weight": !loadingOrderTotal && dataOrderTotal.userOrderTotal.weight*1000,
            "insurance_value": !loadingOrderTotal &&  Math.floor(dataOrderTotal.userOrderTotal.total * 23730)
          });
          
          var config = {
            method: 'post',
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
            headers: { 
              'Token': '48e7ac19-7c71-11ed-a2ce-1e68bf6263c5', 
              'Content-Type': 'application/json', 
              'ShopId': '121118'
            },
            data : data
          };
        await axios(config)
          .then(function (response) {
            console.log(response.data);
            setTotalShip(prev =>prev + response.data.data.total)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const handleOpenModalAddAddress = () => setOpenModalAddAddress(true);
    const handleCloseModalAddAddress = () => setOpenModalAddAddress(false);
    
      useEffect(()=>{
        if(localStorage.getItem('token')===null){
            setUserId('')
        }
        else{
            setUserId(JSON.parse(localStorage.getItem('token')).userId.id)
        }
        getDataDistrict()
        if(!loadingOrderTotal){
            getShipFee()
        }
        if(!loadingUser){
            setAddressId(dataUser.getUserById?.Address[0]?.Address_ID)
            // setDistrictIdsChange(dataUser.getUserById.Default_Address_ID.District_ID)
        }
        if(!loadingUserOrder){
            let count = 0
            let arr = []
            dataUserOrder.getUserOrder.map((item)=>{
                //  await getShipFee(item.Address_ID.District_ID, item.Product_Auction_ID.Weight,Math.floor(item.Total_Price))
                    console.log(item);
                    count = count + item.Total_Price - (item.Product_Auction_ID.Starting_Price * 0.05)
                    arr.push(item.Order_ID)
                })
            setArrOrderId(arr)
            setTotalItem(count)
        }
        if(!dataMutationOrder.loading && dataMutationOrder.called){
            if(dataMutationOrder.error){

            }
            else{
                if(paymentMethods === 'paypal'){
                    // console.log(dataMutationOrder);
                    navigate(`/payment/${dataMutationOrder.data.createPayment.Payment_ID}`)
                }
                else{
                    // console.log(totalItem);
                    navigate('/currency')
                }
            }
        }
      },[districtIdsChange,loadingOrderTotal,loadingUserOrder,dataUserOrder,loadingUser,dataUser,dataMutationOrder.loading,dataMutationOrder.called,dataMutationOrder.error,navigate])
    //   console.log(addressId);
    //   console.log(totalItem);
    //   console.log(arrOrderId);
  return (
    <div className='mt-20 mb-10'>
        <form action="" onSubmit={handleSubmitPayment}>
            <h1 className='text-center font-semibold text-3xl text-textcolor'>Check out</h1>
            <div>
                <h1 className='font-semibold text-2xl text-textcolor mb-2'>Delivery Address</h1>
                <div className='mb-4 ml-6 flex items-center justify-between'>
                    {!loadingUser && (
                        <div>
                            <h1 className='text-base'><span className='text-textcolor'>Name: </span>{receiverNameChange==='' ?  dataUser.getUserById?.Address[0]?.Reciever_Name : receiverNameChange} | {phoneChange === '' ? dataUser.getUserById?.Address[0]?.Phone : phoneChange}</h1>
                            <h1 className='text-base'><span className='text-textcolor'>Address: </span>{addressNameChange === '' ? dataUser.getUserById?.Address[0]?.Address_Name : addressNameChange}</h1>
                            <h1 className='text-base'><span className='text-textcolor'>District: </span>{districtChange === '' ? dataUser.getUserById?.Address[0]?.Address_District : districtChange}</h1>
                        </div>
                    )}
                    <div>
                        <Button onClick={handleOpen} style={{backgroundColor:"#F9D0BE", color:"#ffff"}}>Thay đổi</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div action="" onSubmit={handleSubmitAddress}>
                                    <h1 className='font-semibold text-lg text-textcolor pb-3 border-b-2 border-textcolor'>My Address</h1>
                                    <div className='mb-2'>
                                        {!loadingUser && dataUser.getUserById.Address.map((itemAddress,indexAddress)=>(
                                            <div key={itemAddress.Address_ID} className='flex mt-3'>
                                                <input className='form-check-input mt-2 appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-background-signup checked:border-textcolor focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' type="radio" onClick={()=>handleClickAddress(itemAddress.Address_Name,itemAddress.Address_District,itemAddress.Reciever_Name,itemAddress.Phone,itemAddress.Address_ID,itemAddress.District_ID)} onChange={handleChangeAddress} id={itemAddress.Address_ID} name='address' value={itemAddress.Address_ID} checked={addressId === itemAddress.Address_ID}/>
                                                <label className='form-check-label inline-block text-gray-800 flex-1' htmlFor={itemAddress.Address_ID}>
                                                    <div>
                                                        <h1 className='font-medium'>{itemAddress.Reciever_Name} | <span className='text-gray-400'>{itemAddress.Phone}</span></h1>
                                                        <p className='text-gray-400'>{itemAddress.Address_Name},{itemAddress.Address_District}</p>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <Button type='button' onClick={handleClose} style={{backgroundColor:"#F9D0BE", color:"#ffff",marginRight:"10px"}}>Save</Button>
                                    <Button type='button' onClick={handleOpenModalAddAddress} style={{backgroundColor:"#F9D0BE", color:"#ffff",marginRight:"10px"}}>Add Address</Button>
                                    <Modal
                                                open={openModalAddAddress}
                                                onClose={handleCloseModalAddAddress}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style} noValidate >
                                                    <form action="" onSubmit={handleSubmit}>
                                                    <h1 className='text-center text-xl font-medium text-textcolor mb-2'>Add Address</h1>
                                                    <Stack className='mb-3'>
                                                        <TextField id="recieverName" name='recieverName' value={values.recieverName} onChange={handleChange} label="Full Name" variant="outlined"/>
                                                    </Stack>
                                                    <Stack className='mb-3'>
                                                        <TextField id="phone" name='phone' value={values.phone} onChange={handleChange} label="Phone number" variant="outlined"/>
                                                    </Stack>
                                                    <Stack className='mb-3 gap-3'>
                                                            <TextField
                                                            id="addressDistrict"
                                                            name='addressDistrict'
                                                            value={values.addressDistrict}
                                                            label="District"
                                                            onChange={handleChange}
                                                            select
                                                            sx={{width:"100%"}}
                                                            
                                                            >
                                                            {dataDistrict ? dataDistrict.data.map((itemDistrict,indexDistrict)=>(
                                                                <MenuItem value={itemDistrict.DistrictName} onClick={()=>setDistrictIds(itemDistrict.DistrictID)}  key={itemDistrict.DistrictID}>{itemDistrict.DistrictName}</MenuItem>
                                                            )): <MenuItem disabled>Loading</MenuItem>}
                                                            </TextField>                                                                                                         
                                                    </Stack>
                                                    <Stack className='mb-3'>
                                                        <TextField id="addressName" name='addressName' value={values.addressName} onChange={handleChange} label="Address" variant="outlined"/>
                                                    </Stack>
                                                    <div className='flex gap-2'>
                                                        <Button variant="contained" type='submit' style={{backgroundColor:"#F2AF92",height:"100%"}}>Add Address</Button>
                                                        <Button variant="contained" type='button' onClick={handleCloseModalAddAddress} style={{backgroundColor:"#F2AF92",height:"100%"}}>Close</Button>
                                                    </div>
                                                    </form>
                                                </Box>
                                            </Modal>
                                    <Button type='button' onClick={handleClose} style={{backgroundColor:"#F9D0BE", color:"#ffff"}}>Close</Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
                <hr />
                <h1 className='mt-4 mb-2 font-semibold text-2xl text-textcolor'>All Products</h1>
                <div className='ml-6 flex gap-6 mb-4 flex-wrap'>
                    {!loadingUserOrder &&  dataUserOrder.getUserOrder.map((itemOrder,indexOrder)=>{
                        
                        return(
                            <div className='flex gap-3' key={itemOrder.Order_ID}>
                                <img className='w-40 object-cover rounded-md' src={itemOrder.Product_Auction_ID.Product_ID.Product_Image[0].Product_Image_Url} alt="" />
                                <div>
                                    <p>Product Name: {itemOrder.Product_Auction_ID.Product_ID.Product_Name}</p>
                                    <p>Price: ${itemOrder.Total_Price}</p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
                <hr />
                <div className='flex justify-between my-4'>
                    <h1 className='font-semibold text-2xl text-textcolor mb-2'>Shipping</h1>
                    <p className='font-medium text-lg'>${(totalShip / 23730).toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between my-4'>
                    <h1 className='font-semibold text-2xl text-textcolor mb-2'>Order Total</h1>
                    <p className='font-medium text-lg'>${totalItem}</p>
                </div>
                <hr />
                <div className='flex justify-between my-4'>
                    <h1 className='font-semibold text-2xl text-textcolor mb-2'>Payment Option</h1>
                    <div>
                        <div className='flex gap-2'>
                            {paymentMethod.map((itemMethod)=>(
                                <div onClick={()=>setPaymentMethods(itemMethod.id)} key={itemMethod.id} className={`cursor-pointer p-2 border-2 border-background-signup ${paymentMethods === itemMethod.id ? 'bg-background-signup' : 'bg-white'}`}>
                                    <h1>{itemMethod.title}</h1>
                                </div>
                            ))}
                        </div>
                        {((!loadingCurrency && dataCurrency.getCurrentByUser.Total_Money < ((totalShip / 23730)+totalItem).toFixed(2)) && paymentMethods === 'wallet') && <p className='text-red-700'>Your money in wallet isn't enought to buy</p>}
                    </div>
                </div>
                <hr />
                <div className='my-4'>
                    <h1 className='font-semibold text-2xl text-textcolor mb-2'>Payment Details</h1>
                    <div className='ml-6'>
                        <div className='flex justify-between my-4'>
                            <h1 className='font-semibold text-lg text-textcolor mb-2'>Merchandise SubTotal</h1>
                            <p className='font-medium text-lg'>${totalItem}</p>
                        </div>
                        <div className='flex justify-between my-4'>
                            <h1 className='font-semibold text-lg text-textcolor mb-2'>Shipping Total</h1>
                            <p className='font-medium text-lg'>${(totalShip / 23730).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between my-4'>
                            <h1 className='font-semibold text-lg  mb-2'>Payment Total</h1>
                            <p className='font-medium text-lg'>${!loadingOrderTotal && ((totalShip / 23730)+totalItem).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Button type='submit' disabled={((paymentMethods === 'wallet' && (!loadingCurrency && dataCurrency.getCurrentByUser.Total_Money < (!loadingOrderTotal && ((totalShip / 23730)+dataOrderTotal.userOrderTotal.total).toFixed(2)))) || paymentMethods === '') ? true : false} style={{backgroundColor:"#F9D0BE", color:"#ffff", margin:"0 auto", display:"block", cursor:'pointer'}}>Checkout</Button>
        </form>
    </div>
  )
}

export default Checkout