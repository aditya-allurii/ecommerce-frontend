import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Singapore",
    "United Arab Emirates",
    "Germany",
    "France"
];

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Lakshadweep", "Puducherry"
];

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
            register,
            handleSubmit,
            reset,
            setValue,
            watch,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

        const selectedCountry = watch("country");

        const onSaveAddressHandler = async (data) => {
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal
            ));
        };


        useEffect(() => {
            if (address?.addressId) {
                setValue("buildingName", address?.buildingName);
                setValue("city", address?.city);
                setValue("street", address?.street);
                setValue("state", address?.state);
                setValue("pincode", address?.pincode);
                setValue("country", address?.country);
                setValue("phoneNumber", address?.phoneNumber);
            }
        }, [address, setValue]);

  return (
    <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                    <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl"/>
                        {!address?.addressId ? 
                        "Add Address" :
                        "Update Address"
                        }
                        
                    </div>
            <div className="flex flex-col gap-4">
                <InputField
                    label="Building Name"
                    required
                    id="buildingName"
                    type="text"
                    message="*Building Name is required"
                    placeholder="Enter Building Name"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="Street"
                    required
                    id="street"
                    type="text"
                    message="*Street is required"
                    placeholder="Enter Street"
                    register={register}
                    errors={errors}
                    /> 

                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    message="*City is required"
                    placeholder="Enter City"
                    register={register}
                    errors={errors}
                    />

                {/* Country Selector Dropdown */}
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="country" className="font-semibold text-sm text-slate-800">
                        Country
                    </label>
                    <select
                        id="country"
                        className={`px-2 py-2 border outline-hidden bg-white text-slate-800 rounded-md ${
                            errors.country?.message ? "border-red-500" : "border-slate-700"
                        }`}
                        {...register("country", { required: "*Country is required" })}
                    >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {errors.country?.message && (
                        <p className="text-sm font-semibold text-red-600 mt-0">
                            {errors.country?.message}
                        </p>
                    )}
                </div>

                {/* State Dropdown (Conditional on India) or input */}
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="state" className="font-semibold text-sm text-slate-800">
                        State
                    </label>
                    {selectedCountry === "India" ? (
                        <select
                            id="state"
                            className={`px-2 py-2 border outline-hidden bg-white text-slate-800 rounded-md ${
                                errors.state?.message ? "border-red-500" : "border-slate-700"
                            }`}
                            {...register("state", { required: "*State is required" })}
                        >
                            <option value="">Select State</option>
                            {indianStates.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            id="state"
                            placeholder="Enter State"
                            className={`px-2 py-2 border outline-hidden bg-transparent text-slate-800 rounded-md ${
                                errors.state?.message ? "border-red-500" : "border-slate-700"
                            }`}
                            {...register("state", { required: "*State is required" })}
                        />
                    )}
                    {errors.state?.message && (
                        <p className="text-sm font-semibold text-red-600 mt-0">
                            {errors.state?.message}
                        </p>
                    )}
                </div>

                <InputField
                    label="Pincode"
                    required
                    id="pincode"
                    type="text"
                    message="*Pincode is required"
                    placeholder="Enter Pincode"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="Phone Number"
                    required
                    id="phoneNumber"
                    type="text"
                    message="*Phone Number is required"
                    placeholder="Enter Phone Number (e.g. +917330871444)"
                    register={register}
                    errors={errors}
                    validate={(val) => {
                        if (!val) return true;
                        if (selectedCountry === "India") {
                            if (!/^\+91[6-9]\d{9}$/.test(val) && !/^\+91\d{10}$/.test(val)) {
                                return "Indian phone numbers must start with country code +91 followed by 10 digits";
                            }
                        } else {
                            if (!/^\+\d{10,15}$/.test(val)) {
                                return "Phone number must start with '+' followed by country code (e.g. +1 for USA)";
                            }
                        }
                        return true;
                    }}
                />
            </div>

            <button
                disabled={btnLoader}
                className="text-white bg-custom-blue px-4 py-2 rounded-md mt-6 w-full sm:w-auto font-semibold hover:bg-opacity-90 transition duration-150"
                type="submit">
                {btnLoader ? (
                    <>
                    <Spinners /> Loading...
                    </>
                ) : (
                    <>Save Address</>
                )}
            </button>
            </form>
        </div>
  )
}

export default AddAddressForm