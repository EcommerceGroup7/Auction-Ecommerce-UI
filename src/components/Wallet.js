import React, { useEffect, useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@apollo/client';
import { rechargeMoney } from '../graphql/mutation';
import { useNavigate,useParams } from 'react-router-dom';
const Wallet = () => {
    const navigate = useNavigate()
    const param = useParams()
      const success = ()=>toast.success('Thanh toán thành công)', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    const [withDrawMoney, setWithDraw] = useState(0)
    const [error, setError] = useState(null)
    const [successed,setSuccessed] = useState(null)
    const [rechargeMoneyInAuc, dataMutation] = useMutation(rechargeMoney)
    const product = {
      description: 'You have just drew your money from paypal bank to your account bank',
      price: withDrawMoney,
    }
    
    if (error) {
      alert(error)
    }
    useEffect(()=>{
      if(!dataMutation.loading && dataMutation.called){
        if(dataMutation.error){
          console.log(dataMutation.error);
        }
        else{
          console.log(successed);
        }
      }
    },[dataMutation.loading,dataMutation.called,dataMutation.error])
  return (
    <>
    {param.wallet !== 'pay' && (
      <Box className='text-center mb-4 z-0'>
        <TextField id="outlined-basic" type='number' label={param.wallet === 'recharge' ? 'Recharge' : 'Withdraw'} variant="outlined" className='' value={withDrawMoney} onChange={(e)=>setWithDraw(e.target.value)} InputProps={{
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
            min:1,
          }}/>
      </Box>
    )}
    <PayPalScriptProvider
      options={{
        'client-id':
          'AdlmBYvM4eK7VMm09oUCrIDy84IQSjTe_mt1Pws-499cqK9VK-9Jr-pycTaKiVhkVMx7Fxgsce7tWIgU',
      }}
    >
      <PayPalButtons
        
        className="text-center z-0"
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourses = false
          if (hasAlreadyBoughtCourses) {
            setError('bạn đã mua cái này')
            return actions.reject()
          } else {
            return actions.resolve()
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value:parseFloat(withDrawMoney).toFixed(2),
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture()
          console.log('order', order)
        //   handleApprove(data.orderID)
            await rechargeMoneyInAuc({
              variables:{
                amount:+order.purchase_units[0].amount.value
              }
            })
            setSuccessed(order.purchase_units[0].amount.value)
            success()
            navigate('/currency')
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err)
          console.log('PayPal checkout on error', err)
        }}
        forceReRender={[withDrawMoney]} 
      />
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </PayPalScriptProvider>
  </>
  )
}

export default Wallet