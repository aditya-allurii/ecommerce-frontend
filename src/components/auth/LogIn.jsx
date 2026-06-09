import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserPlus, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser, registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = ({ initialType = "existing" }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [authType, setAuthType] = useState(initialType); // "existing", "admin", "new"

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    useEffect(() => {
        setAuthType(initialType);
        reset();
    }, [initialType, reset]);

    const handleTabChange = (type) => {
        setAuthType(type);
        reset();
    };

    const submitHandler = async (data) => {
        if (authType === "new") {
            const navigateWrapper = (path) => {
                if (path === "/login") {
                    setAuthType("existing");
                } else {
                    navigate(path);
                }
            };
            dispatch(registerNewUser(data, toast, reset, navigateWrapper, setLoader));
        } else {
            const isAdmin = authType === "admin";
            dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader, isAdmin));
        }
    };

    const getHeaderIcon = () => {
        if (authType === "admin") return <FaUserShield className="text-rose-600 text-5xl transition-all duration-300" />;
        if (authType === "new") return <FaUserPlus className="text-indigo-600 text-5xl transition-all duration-300" />;
        return <AiOutlineLogin className="text-slate-800 text-5xl transition-all duration-300" />;
    };

    const getHeaderTitle = () => {
        if (authType === "admin") return "Admin Login";
        if (authType === "new") return "Register Account";
        return "Login Here";
    };

    const getButtonText = () => {
        if (authType === "admin") return "Login as Admin";
        if (authType === "new") return "Register";
        return "Login";
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-8">
            <div className="sm:w-[460px] w-[365px] shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white border border-slate-100">
                
                {/* Unified Tab Selector */}
                <div className="flex bg-slate-100 rounded-lg p-1 mb-6 gap-1">
                    <button
                        type="button"
                        onClick={() => handleTabChange("existing")}
                        className={`flex-1 py-2 text-center text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                            authType === "existing"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        Existing User
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange("admin")}
                        className={`flex-1 py-2 text-center text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                            authType === "admin"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        Admin Login
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange("new")}
                        className={`flex-1 py-2 text-center text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                            authType === "new"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        New User
                    </button>
                </div>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {getHeaderIcon()}
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold transition-all duration-300">
                            {getHeaderTitle()}
                        </h1>
                    </div>
                    
                    <hr className="mt-2 mb-5 border-slate-200" />
                    
                    <div className="flex flex-col gap-3">
                        <InputField
                            label={authType === "new" ? "UserName" : "Username, Email, or Phone Number"}
                            required
                            id="username"
                            type="text"
                            message={authType === "new" ? "*UserName is required" : "*Username, Email, or Phone Number is required"}
                            placeholder={authType === "new" ? "Enter your username" : "Enter your username, email, or phone number"}
                            register={register}
                            errors={errors}
                        />

                        {authType === "new" && (
                            <>
                                <InputField
                                    label="Email"
                                    required
                                    id="email"
                                    type="email"
                                    message="*Email is required"
                                    placeholder="Enter your email"
                                    register={register}
                                    errors={errors}
                                />

                                <InputField
                                    label="Phone Number"
                                    required
                                    id="phoneNumber"
                                    type="text"
                                    message="*Phone Number is required"
                                    placeholder="Enter your phone number (e.g. +917330871444)"
                                    register={register}
                                    errors={errors}
                                    validate={(val) => {
                                        if (!val) return true;
                                        if (/^[6-9]\d{9}$/.test(val) || /^\d{10}$/.test(val)) {
                                            return "Please include country code (e.g. +917330871444 for India)";
                                        }
                                        if (!/^\+\d{10,15}$/.test(val)) {
                                            return "Phone number must start with '+' followed by country code and digits (e.g., +917330871444)";
                                        }
                                        return true;
                                    }}
                                />
                            </>
                        )}

                        <InputField
                            label="Password"
                            required
                            id="password"
                            min={authType === "new" ? 6 : undefined}
                            type="password"
                            message="*Password is required"
                            placeholder="Enter your password"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <button
                        disabled={loader}
                        className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-200 transition-colors duration-100 rounded-xs my-5 shadow-md"
                        type="submit"
                    >
                        {loader ? (
                            <>
                                <Spinners /> Loading...
                            </>
                        ) : (
                            <>{getButtonText()}</>
                        )}
                    </button>

                    {/* Footer helper text */}
                    <div className="text-center text-xs sm:text-sm text-slate-500 mt-4">
                        {authType === "existing" && (
                            <p>
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => handleTabChange("new")}
                                    className="font-semibold underline text-slate-800 hover:text-black"
                                >
                                    SignUp
                                </button>
                            </p>
                        )}
                        {authType === "admin" && (
                            <p className="text-slate-400">
                                Use your store admin credentials to access the panel.
                            </p>
                        )}
                        {authType === "new" && (
                            <p>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => handleTabChange("existing")}
                                    className="font-semibold underline text-slate-800 hover:text-black"
                                >
                                    Login
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;