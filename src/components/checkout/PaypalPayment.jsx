import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPaypal, FaLock } from 'react-icons/fa';
import api from '../../api/api';

const PaypalPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { totalPrice } = useSelector((state) => state.carts);
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const handleOpenPaypal = () => {
        setIsModalOpen(true);
    };

    const handleConfirmPayment = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter your PayPal credentials.");
            return;
        }

        setLoading(true);
        setLoadingStep("Connecting to PayPal...");

        try {
            await new Promise(r => setTimeout(r, 600));
            setLoadingStep("Authorizing payment...");
            await new Promise(r => setTimeout(r, 800));
            setLoadingStep("Processing transaction...");
            await new Promise(r => setTimeout(r, 600));

            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: "Paypal (Simulated)",
                pgPaymentId: `mock-paypal-${Date.now()}`,
                pgStatus: "succeeded",
                pgResponseMessage: "PayPal payment successful (Simulated)"
            };

            const response = await api.post("/order/users/payments/online", sendData);

            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("PayPal Payment Successful!");
                setIsModalOpen(false);
                navigate("/order-confirm?payment_method=Paypal");
            } else {
                toast.error("PayPal transaction failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "PayPal checkout failed.");
        } finally {
            setLoading(false);
            setLoadingStep("");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 text-[#003087] rounded-full">
                    <FaPaypal size={48} />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pay with PayPal</h2>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Confirm your order details and pay quickly using your registered PayPal account.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-between items-center text-left border border-gray-100">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Payment Amount</p>
                    <p className="text-xl font-bold text-custom-blue">₹{Number(totalPrice).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                    <FaLock className="text-green-600" />
                    <span>Secure Checkout</span>
                </div>
            </div>

            <button
                onClick={handleOpenPaypal}
                className="w-full bg-[#FFC439] hover:bg-[#F2B522] text-[#003087] font-extrabold py-3.5 px-6 rounded-xl shadow-sm transition-colors duration-200 flex justify-center items-center space-x-2 text-lg"
            >
                <FaPaypal className="text-[#0079C1]" />
                <span>PayPal</span>
            </button>

            {/* Paypal Simulated Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => !loading && setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                            disabled={loading}
                        >
                            &times;
                        </button>

                        <div className="flex justify-center mb-4">
                            <FaPaypal size={36} className="text-[#0070BA]" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Log in with PayPal</h3>
                        <p className="text-xs text-gray-500 text-center mb-6">Pay for Vyra Marketplace order of ₹{Number(totalPrice).toFixed(2)}</p>

                        {loading ? (
                            <div className="py-8 text-center space-y-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0070BA] border-t-transparent mx-auto"></div>
                                <p className="text-sm text-gray-600 font-medium">{loadingStep}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleConfirmPayment} className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0070BA] transition-all text-sm"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0070BA] transition-all text-sm"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white font-bold py-3 px-6 rounded-xl shadow-sm transition-all"
                                >
                                    Log In & Pay Now
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full text-sm text-[#0070BA] hover:underline font-semibold text-center"
                                >
                                    Cancel and return to Vyra
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaypalPayment;