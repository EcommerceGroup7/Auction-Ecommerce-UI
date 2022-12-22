import React, { useEffect, useState,useContext } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getLastestPayment } from '../graphql/queries';
import { UserContext } from '../App';
const Paypal = () => {
  const navigate = useNavigate()
  const param = useParams()
  const {setCartValue} = useContext(UserContext)
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
  const {loading,errors,data}=useQuery(getLastestPayment,{
    variables:{
      Payment_ID:param.paypal
    }
  })
  const product = {
    description: 'You have just pay success',
    price: !loading && data.getLastestPayment.Total,
  }
  
  if (error) {
    alert(error)
  }
  useEffect(()=>{
    
  },[])
  return (
    <>
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
                    value:product.price,
                  },
                },
              ],
            })
          }}
          onApprove={ async(data, actions) => {
            const order =  await actions.order.capture()
              console.log('order', order)
          //   handleApprove(data.orderID)
              success()
              setCartValue(0)
              navigate('/currency')
          }}
          onCancel={() => {}}
          onError={(err) => {
            setError(err)
            console.log('PayPal checkout on error', err)
          }}
          forceReRender={[product.price]} 
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

export default Paypal
