import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaHandHoldingUsd, FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';
import { placeCodOrder } from '../../store/actions';

const CodPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { totalPrice, cart } = useSelector((state) => state.carts);
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const handleConfirmOrder = () => {
        if (!selectedUserCheckoutAddress) {
            toast.error("Please select a delivery address.");
            return;
        }

        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "cash-on-delivery",
            pgPaymentId: `COD-${Date.now()}`,
            pgStatus: "succeeded",
            pgResponseMessage: "Cash on delivery order placed successfully"
        };

        dispatch(placeCodOrder(sendData, setErrorMessage, setLoading, navigate, toast));
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100 mt-10">
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
                <div className="p-3 bg-blue-50 text-custom-blue rounded-lg">
                    <FaHandHoldingUsd className="text-2xl" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Cash on Delivery / Test Payment</h2>
                    <p className="text-sm text-gray-500">Review your order details and place your order.</p>
                </div>
            </div>

            {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <div className="space-y-6">
                {/* Delivery Address Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-2 mb-3 text-gray-700 font-semibold">
                        <FaMapMarkerAlt className="text-gray-500" />
                        <span>Delivery Address</span>
                    </div>
                    {selectedUserCheckoutAddress ? (
                        <div className="text-sm text-gray-600 space-y-1 pl-6">
                            <p className="font-semibold text-gray-800">{selectedUserCheckoutAddress.buildingName}</p>
                            <p>{selectedUserCheckoutAddress.street}</p>
                            <p>{selectedUserCheckoutAddress.city}, {selectedUserCheckoutAddress.state} - {selectedUserCheckoutAddress.pincode}</p>
                            {selectedUserCheckoutAddress.phoneNumber && (
                                <p className="text-sm text-gray-600 font-semibold">Phone: {selectedUserCheckoutAddress.phoneNumber}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{selectedUserCheckoutAddress.country}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-red-500 pl-6">No address selected. Please go back and select an address.</p>
                    )}
                </div>

                {/* Delivery Speed Note */}
                <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-xl border border-green-100">
                    <FaShippingFast className="text-green-600 text-lg mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-green-800">Free Standard Delivery</p>
                        <p className="text-xs text-green-600 mt-0.5">Estimated delivery time: 3 - 5 business days.</p>
                    </div>
                </div>

                {/* Pricing Summary */}
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Items Total ({cart?.length || 0})</span>
                        <span>₹{Number(totalPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Charges</span>
                        <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-2 mt-2">
                        <span>Order Total</span>
                        <span className="text-custom-blue">₹{Number(totalPrice).toFixed(2)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <button
                    onClick={handleConfirmOrder}
                    disabled={loading || !selectedUserCheckoutAddress}
                    className="w-full mt-4 bg-custom-blue hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2"
                >
                    {loading ? (
                        <>
                            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></span>
                            <span>Placing Order...</span>
                        </>
                    ) : (
                        <span>Confirm & Place Order</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CodPayment;
