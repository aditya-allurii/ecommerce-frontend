import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaCreditCard, FaLock, FaRegCreditCard } from 'react-icons/fa';
import api from '../../api/api';

const MockCardPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");

    const { totalPrice } = useSelector((state) => state.carts);
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formattedValue);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 4);
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }
        setExpiry(value);
    };

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        setCvv(value.substring(0, 3));
    };

    const handlePay = async (e) => {
        e.preventDefault();
        if (cardNumber.replace(/\s/g, "").length !== 16) {
            toast.error("Please enter a valid 16-digit card number.");
            return;
        }
        if (expiry.length !== 5) {
            toast.error("Please enter a valid expiry date (MM/YY).");
            return;
        }
        if (cvv.length !== 3) {
            toast.error("Please enter a valid 3-digit CVV.");
            return;
        }
        if (!cardName.trim()) {
            toast.error("Please enter the cardholder name.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        // Simulate banking transaction steps for realistic premium feel
        try {
            setLoadingStep("Connecting to secure payment gateway...");
            await new Promise(r => setTimeout(r, 800));
            setLoadingStep("Authorizing transaction with your bank...");
            await new Promise(r => setTimeout(r, 1000));
            setLoadingStep("Finalizing order placement...");

            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: "Stripe (Simulated)",
                pgPaymentId: `mock-stripe-${Date.now()}`,
                pgStatus: "succeeded",
                pgResponseMessage: "Credit card payment successful (Simulated)"
            };

            const response = await api.post("/order/users/payments/online", sendData);

            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("Payment Successful!");
                navigate("/order-confirm?payment_method=Stripe");
            } else {
                setErrorMessage("Transaction failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error?.response?.data?.message || "Payment processing failed. Please check details and try again.");
        } finally {
            setLoading(false);
            setLoadingStep("");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
                <div className="p-3 bg-blue-50 text-custom-blue rounded-lg">
                    <FaCreditCard className="text-2xl" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Credit / Debit Card</h2>
                    <p className="text-sm text-gray-500">Pay securely using your credit or debit card.</p>
                </div>
            </div>

            {loading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-custom-blue border-t-transparent"></div>
                    <p className="text-sm text-gray-600 font-medium animate-pulse">{loadingStep}</p>
                </div>
            ) : (
                <form onSubmit={handlePay} className="space-y-4">
                    {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Card Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-custom-blue transition-all"
                                required
                            />
                            <FaRegCreditCard className="absolute left-3.5 top-3.5 text-gray-400 text-base" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={handleExpiryChange}
                                className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-custom-blue transition-all text-center"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase">CVV</label>
                            <input
                                type="password"
                                placeholder="•••"
                                value={cvv}
                                onChange={handleCvvChange}
                                className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-custom-blue transition-all text-center"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Cardholder Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-custom-blue transition-all"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-500 py-2">
                        <FaLock className="text-green-600" />
                        <span>Your payment info is encrypted and secured by 256-bit SSL.</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-custom-blue hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors duration-200 flex justify-center items-center"
                    >
                        <span>Pay ₹{Number(totalPrice).toFixed(2)}</span>
                    </button>
                </form>
            )}
        </div>
    );
};

export default MockCardPayment;
