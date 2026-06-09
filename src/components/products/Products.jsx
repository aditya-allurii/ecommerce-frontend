import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { useSearchParams } from "react-router-dom";

const categoryBanners = {
    "electronics": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&h=300&q=80",
    "home appliances": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&h=300&q=80",
    "fashion": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&h=300&q=80",
    "beauty & personal care": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=300&q=80",
    "furniture & home living": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=300&q=80",
    "sports & fitness": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&h=300&q=80",
    "grocery": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=300&q=80",
    "automotive": "https://images.unsplash.com/photo-1449130320948-d5646ab59c91?auto=format&fit=crop&w=1200&h=300&q=80",
    "books": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&h=300&q=80",
    "toys & baby": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=1200&h=300&q=80"
};

const Products = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get("category");
    const bannerUrl = activeCategory ? categoryBanners[activeCategory.toLowerCase()] : null;

    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter categories={categories ? categories : []}/>
            
            {bannerUrl && (
                <div className="w-full h-48 md:h-64 mt-6 rounded-xl overflow-hidden shadow-lg relative">
                    <img 
                        src={bannerUrl} 
                        alt={`${activeCategory} banner`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center pl-8">
                        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide uppercase drop-shadow-md">
                            {activeCategory}
                        </h1>
                    </div>
                </div>
            )}
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                       {products && 
                        products.map((item, i) => <ProductCard key={i} {...item} />
                        )}
                    </div>
                    <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage = {pagination?.totalPages}
                            totalProducts = {pagination?.totalElements}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;