import React, { useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Paypal = () => {
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
    
  const product = {
    description: 'djahdlajldasjkldjasldjasld',
    price: 29,
  }
  const [paidFor, setPaidFor] = useState(false)
  const [error, setError] = useState(null)
//   const handleApprove = (orderId) => {
//     setPaidFor(true)
//   }
//   if (paidFor) {
//     // alert('thanh toán thành công')
//     success()
//   }
  if (error) {
    alert(error)
  }
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'AdlmBYvM4eK7VMm09oUCrIDy84IQSjTe_mt1Pws-499cqK9VK-9Jr-pycTaKiVhkVMx7Fxgsce7tWIgU',
      }}
    >
      <PayPalButtons
        className="text-center"
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
                  value: product.price,
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture()
          console.log('order', order)
        //   handleApprove(data.orderID)
            success()
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err)
          console.log('PayPal checkout on error', err)
        }}
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
  )
}

export default Paypal
