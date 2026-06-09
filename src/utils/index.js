import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";
import { bannerImageOne, bannerImageTwo, bannerImageThree, bannerImageFour, bannerImageFive } from "./constant";

export const bannerLists = [
    {
        id: 1,
        image: bannerImageOne,
        title: "Home Comfort",
        subtitle: "Furniture & Home Living",
        description: "Upgrade your space with cozy and stylish sofas",
        category: "Furniture & Home Living"
    },
    {
        id: 2,
        image: bannerImageTwo,
        title: "Electronics Deals",
        subtitle: "Entertainment Hub",
        description: "Experience the latest in smart TVs and gadgets",
        category: "Electronics"
    },
    {
        id: 3,
        image: bannerImageThree,
        title: "Fashion Collection",
        subtitle: "Trending Apparel",
        description: "Bright and fun styles, up to 20% off",
        category: "Fashion"
    },
    {
        id: 4,
        image: bannerImageFour,
        title: "Beauty Essentials",
        subtitle: "Skincare & Cosmetics",
        description: "Elevate your daily routine with top beauty brands",
        category: "Beauty & Personal Care"
    },
    {
        id: 5,
        image: bannerImageFive,
        title: "Sports Zone",
        subtitle: "Fitness Gear",
        description: "Stay fit and active with premium athletic equipment",
        category: "Sports & Fitness"
    }
];


export const adminNavigation = [
  {
    name: "Dashboard", 
    href: "/admin", 
    icon: FaHome, 
    current: true 
  }, {
    name: "Orders", 
    href: "/admin/orders", 
    icon: FaShoppingCart
  }, {
    name: "Products", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }, {
    name: "Categories", 
    href: "/admin/categories", 
    icon: FaThList
  }, {
    name: "Sellers", 
    href: "/admin/sellers", 
    icon: FaStore 
  }
];


export const sellerNavigation = [
  {
    name: "Orders", 
    href: "/admin/orders", 
    icon: FaShoppingCart,
    current: true 
  }, {
    name: "Products", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }
];