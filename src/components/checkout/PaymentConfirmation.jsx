import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const  [errorMessage, setErrorMessage ] = useState("");
    const { cart } = useSelector((state) => state.carts);
    const [ loading, setLoading] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const paymentMethod = searchParams.get("payment_method");
    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    useEffect(() => {
        if (paymentIntent &&
            clientSecret &&
            redirectStatus &&
            cart &&
            cart?.length > 0
        ) { 
            console.log(selectedUserCheckoutAddress);
            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
              };
              console.log(sendData);
            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart]);

  const isCod = paymentMethod === "cash-on-delivery";

  return (
    <div className='min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50/50 py-12 px-4'>
        {loading ? (
            <div className='lg:w-[50%] mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
                <Skeleton />
          </div>
        ) : errorMessage ? (
            <div className="p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto bg-white border border-red-100">
                <div className="text-red-500 mb-4 flex justify-center">
                    <FaCheckCircle size={64} className="text-red-500 transform rotate-180" />
                </div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Payment Failed</h2>
                <p className="text-gray-600 mb-6">{errorMessage}</p>
                <Link to="/checkout" className="inline-block bg-custom-blue hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200">
                    Try Again
                </Link>
            </div>
        ) : (
            <div className="p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto bg-white border border-gray-100">
                <div className="text-green-500 mb-4 flex justify-center">    
                    <FaCheckCircle size={64} className="animate-bounce" />
                </div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                    {isCod ? "Order Placed!" : "Payment Successful!"}
                </h2>
                <p className="text-gray-600 mb-6">
                    {isCod 
                      ? "Thank you for your purchase! Your cash on delivery order has been received, and we’re processing your order."
                      : "Thank you for your purchase! Your payment was successful, and we’re processing your order."
                    }
                </p>
                <Link to="/" className="inline-block bg-custom-blue hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-md">
                    Continue Shopping
                </Link>
            </div>
        )}
    </div>
  )
}

export default PaymentConfirmation;