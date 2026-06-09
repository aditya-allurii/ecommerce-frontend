import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";
import api from "../../api/api";

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const { user, address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const { data } = await api.get("/users/addresses");
                dispatch({ type: "USER_ADDRESS", payload: data });
            } catch (error) {
                console.log("Navbar address fetch failed", error);
            }
        };
        if (user && user.id && (!address || address.length === 0)) {
            fetchAddresses();
        }
    }, [dispatch, user]);

    const activeAddress = selectedUserCheckoutAddress || (address && address.length > 0 ? address[0] : null);
    const addressLine = activeAddress 
        ? `${activeAddress.city}, ${activeAddress.pincode}` 
        : "Set address";
    
    return (
        <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <div className="flex flex-col justify-center">
                    <Link to="/" className="flex items-center text-2xl font-bold leading-tight">
                        <FaStore className="mr-2 text-3xl" />
                        <span className="font-[Poppins]">Vyra</span>
                    </Link>
                    {user && (
                        <Link to="/checkout" className="flex items-center text-[10px] text-gray-300 pl-1 hover:text-white transition-colors duration-150 leading-none mt-0.5">
                            <FaMapMarkerAlt className="text-gray-400 mr-1 text-[9px]" />
                            <span className="mr-1">Deliver to:</span>
                            <span className="font-semibold text-white truncate max-w-[150px]">
                                {addressLine}
                            </span>
                        </Link>
                    )}
                </div>

            <ul className={`flex sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient   text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>
                <li className="font-medium transition-all duration-150">
                   <Link className={`${
                    path === "/" ? "text-white font-semibold" : "text-gray-200"
                   }`}
                    to="/">
                        Home
                   </Link> 
                </li>

                <li className="font-medium transition-all duration-150">
                   <Link className={`${
                    path === "/products" ? "text-white font-semibold" : "text-gray-200"
                   }`}
                    to="/products">
                        Products
                   </Link> 
                </li>


                <li className="font-medium transition-all duration-150">
                   <Link className={`${
                    path === "/about" ? "text-white font-semibold" : "text-gray-200"
                   }`}
                    to="/about">
                        About
                   </Link> 
                </li>

                <li className="font-medium transition-all duration-150">
                   <Link className={`${
                    path === "/contact" ? "text-white font-semibold" : "text-gray-200"
                   }`}
                    to="/contact">
                        Contact
                   </Link> 
                </li>

                <li className="font-medium transition-all duration-150">
                   <Link className={`${
                    path === "/cart" ? "text-white font-semibold" : "text-gray-200"
                   }`}
                    to="/cart">
                        <Badge
                            showZero
                            badgeContent={cart?.length || 0}
                            color="primary"
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
                                <FaShoppingCart size={25} />
                        </Badge>
                   </Link> 
                </li>

                {(user && user.id) ? (
                    <li className="font-medium transition-all duration-150">
                        <UserMenu />
                    </li>
                ) : (
                <li className="font-medium transition-all duration-150">
                   <Link className="flex items-center space-x-2 px-4 py-[6px] 
                            bg-linear-to-r from-purple-600 to-red-500 
                            text-white font-semibold rounded-md shadow-lg 
                            hover:from-purple-500 hover:to-red-400 transition 
                            duration-300 ease-in-out transform "
                    to="/login">
                        <FaSignInAlt />
                        <span>Login</span>
                   </Link> 
                </li>
                )}
            </ul>

            <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="sm:hidden flex items-center sm:mt-0 mt-2">
                    {navbarOpen ? (
                        <RxCross2 className="text-white text-3xl" />
                    ) : (
                        <IoIosMenu className="text-white text-3xl" />
                    )}
            </button>
            </div>
        </div>
    )
}

export default Navbar;