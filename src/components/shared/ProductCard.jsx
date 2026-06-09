import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const getBrand = (productName) => {
    const lower = productName.toLowerCase();
    // Electronics
    if (lower.startsWith("apple") || lower.includes("iphone") || lower.includes("ipad") || lower.includes("macbook") || lower.includes("airpods") || lower.includes("airtag")) return "Apple";
    if (lower.startsWith("samsung") || lower.includes("galaxy")) return "Samsung";
    if (lower.startsWith("sony") || lower.includes("playstation")) return "Sony";
    if (lower.startsWith("logitech")) return "Logitech";
    if (lower.startsWith("dell")) return "Dell";
    if (lower.startsWith("keychron")) return "Keychron";
    if (lower.startsWith("razer")) return "Razer";
    if (lower.startsWith("anker")) return "Anker";
    if (lower.startsWith("jbl")) return "JBL";
    if (lower.startsWith("bose")) return "Bose";
    if (lower.startsWith("kindle")) return "Amazon";
    if (lower.startsWith("nintendo")) return "Nintendo";
    if (lower.startsWith("gopro")) return "GoPro";
    if (lower.startsWith("dji")) return "DJI";
    if (lower.startsWith("asus")) return "ASUS";
    if (lower.startsWith("canon")) return "Canon";
    // Home Appliances
    if (lower.startsWith("lg")) return "LG";
    if (lower.startsWith("daikin")) return "Daikin";
    if (lower.startsWith("kent")) return "Kent";
    if (lower.startsWith("dyson")) return "Dyson";
    if (lower.startsWith("bajaj")) return "Bajaj";
    if (lower.startsWith("philips")) return "Philips";
    if (lower.startsWith("havells")) return "Havells";
    if (lower.startsWith("crompton")) return "Crompton";
    if (lower.startsWith("bosch")) return "Bosch";
    if (lower.startsWith("voltas")) return "Voltas";
    if (lower.startsWith("ifb")) return "IFB";
    if (lower.startsWith("morphy")) return "Morphy Richards";
    if (lower.startsWith("prestige")) return "Prestige";
    if (lower.startsWith("eureka")) return "Eureka Forbes";
    if (lower.startsWith("nespresso")) return "Nespresso";
    // Fashion
    if (lower.startsWith("nike")) return "Nike";
    if (lower.startsWith("levis") || lower.includes("levi's")) return "Levi's";
    if (lower.startsWith("tommy")) return "Tommy Hilfiger";
    if (lower.startsWith("ray-ban") || lower.startsWith("ray ban")) return "Ray-Ban";
    if (lower.startsWith("adidas")) return "Adidas";
    if (lower.startsWith("puma")) return "Puma";
    if (lower.startsWith("ralph")) return "Ralph Lauren";
    if (lower.startsWith("champion")) return "Champion";
    if (lower.startsWith("calvin")) return "Calvin Klein";
    if (lower.startsWith("under armour")) return "Under Armour";
    if (lower.startsWith("uniqlo")) return "Uniqlo";
    if (lower.startsWith("h&m")) return "H&M";
    if (lower.startsWith("woodland")) return "Woodland";
    if (lower.startsWith("casio")) return "Casio";
    if (lower.startsWith("fossil")) return "Fossil";
    // Beauty
    if (lower.startsWith("neutrogena")) return "Neutrogena";
    if (lower.startsWith("cerave")) return "CeraVe";
    if (lower.startsWith("chanel") || lower.includes("chanel")) return "Chanel";
    if (lower.startsWith("l'oreal") || lower.startsWith("loreal")) return "L'Oréal";
    if (lower.startsWith("the ordinary")) return "The Ordinary";
    if (lower.startsWith("olaplex")) return "Olaplex";
    if (lower.startsWith("maybelline")) return "Maybelline";
    if (lower.startsWith("burt's bees")) return "Burt's Bees";
    if (lower.startsWith("estee") || lower.startsWith("estée")) return "Estée Lauder";
    if (lower.startsWith("moroccanoil")) return "Moroccanoil";
    if (lower.startsWith("lakme")) return "Lakmé";
    if (lower.startsWith("dove")) return "Dove";
    if (lower.startsWith("nivea")) return "Nivea";
    if (lower.startsWith("clinique")) return "Clinique";
    if (lower.startsWith("kiehl")) return "Kiehl's";
    if (lower.startsWith("la roche")) return "La Roche-Posay";
    if (lower.startsWith("fenty")) return "Fenty Beauty";
    if (lower.startsWith("laneige")) return "Laneige";
    if (lower.startsWith("urban decay")) return "Urban Decay";
    // Sports
    if (lower.startsWith("wilson")) return "Wilson";
    if (lower.startsWith("garmin")) return "Garmin";
    if (lower.startsWith("hydro flask")) return "Hydro Flask";
    if (lower.startsWith("coleman")) return "Coleman";
    if (lower.startsWith("camelbak")) return "CamelBak";
    if (lower.startsWith("spalding")) return "Spalding";
    if (lower.startsWith("fitbit")) return "Fitbit";
    if (lower.startsWith("schwinn")) return "Schwinn";
    if (lower.startsWith("callaway")) return "Callaway";
    if (lower.startsWith("yonex")) return "Yonex";
    if (lower.startsWith("oakley")) return "Oakley";
    if (lower.startsWith("theragun")) return "Therabody";
    if (lower.startsWith("kookaburra")) return "Kookaburra";
    if (lower.startsWith("yeti")) return "YETI";
    if (lower.startsWith("trx")) return "TRX";
    // Grocery
    if (lower.startsWith("tata")) return "Tata";
    if (lower.startsWith("aashirvaad")) return "Aashirvaad";
    if (lower.startsWith("fortune")) return "Fortune";
    if (lower.startsWith("amul")) return "Amul";
    if (lower.startsWith("maggi")) return "Maggi";
    if (lower.startsWith("nescafe")) return "Nescafé";
    if (lower.startsWith("india gate")) return "India Gate";
    if (lower.startsWith("cadbury")) return "Cadbury";
    if (lower.startsWith("saffola")) return "Saffola";
    if (lower.startsWith("kellogg")) return "Kellogg's";
    if (lower.startsWith("haldiram")) return "Haldiram's";
    if (lower.startsWith("britannia")) return "Britannia";
    if (lower.startsWith("tropicana")) return "Tropicana";
    if (lower.startsWith("mdh")) return "MDH";
    if (lower.startsWith("kissan")) return "Kissan";
    if (lower.startsWith("paper boat")) return "Paper Boat";
    if (lower.startsWith("bournvita")) return "Bournvita";
    if (lower.startsWith("catch")) return "Catch";
    // Automotive
    if (lower.startsWith("michelin")) return "Michelin";
    if (lower.startsWith("pioneer")) return "Pioneer";
    if (lower.startsWith("70mai")) return "70mai";
    if (lower.startsWith("meguiar")) return "Meguiar's";
    if (lower.startsWith("ctek")) return "CTEK";
    if (lower.startsWith("castrol")) return "Castrol";
    if (lower.startsWith("rain-x")) return "Rain-X";
    if (lower.startsWith("exide")) return "Exide";
    if (lower.startsWith("amaron")) return "Amaron";
    if (lower.startsWith("3m")) return "3M";
    // Toys & Baby
    if (lower.startsWith("lego")) return "LEGO";
    if (lower.startsWith("nerf")) return "Nerf";
    if (lower.startsWith("melissa")) return "Melissa & Doug";
    if (lower.startsWith("crayola")) return "Crayola";
    if (lower.startsWith("fisher-price") || lower.startsWith("fisher price")) return "Fisher-Price";
    if (lower.startsWith("vtech")) return "VTech";
    if (lower.startsWith("hot wheels")) return "Hot Wheels";
    if (lower.startsWith("funskool")) return "Funskool";
    if (lower.startsWith("pampers") || lower.includes("pampers")) return "Pampers";
    if (lower.startsWith("play-doh")) return "Play-Doh";
    if (lower.startsWith("johnson")) return "Johnson's";
    // Fallback
    return productName.split(" ")[0];
};

const ProductCard = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        categoryName,
        about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }} 
                    className="w-full overflow-hidden aspect-3/2 bg-white flex items-center justify-center">
                <img 
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 transform hover:scale-105"
                src={image}
                alt={productName}>
                </img>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {getBrand(productName)}
                    </span>
                    {categoryName && (
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                            {categoryName}
                        </span>
                    )}
                </div>
                <h2 onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }}
                    className="text-lg font-semibold mb-1 cursor-pointer">
                    {truncateText(productName, 50)}
                </h2>
                <div className="flex items-center mb-2">
                    <span className="text-amber-500 mr-1">★</span>
                    <span className="text-sm font-semibold text-gray-700">
                        {(4.0 + (productId % 10) * 0.1).toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                        ({(15 + (productId % 100) * 3)} reviews)
                    </span>
                </div>
                
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {truncateText(description, 80)}
                    </p>
                </div>

            { !about && (
                <div className="flex items-center justify-between">
                {specialPrice ? (
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ₹{Number(price).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                            ₹{Number(specialPrice).toFixed(2)}
                        </span>
                    </div>
                ) : (
                    <span className="text-xl font-bold text-slate-700">
                        {"  "}
                        ₹{Number(price).toFixed(2)}
                    </span>
                )}

                <button
                    disabled={!isAvailable || btnLoader}
                    onClick={() => addToCartHandler({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"}
                        text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}>
                    <FaShoppingCart className="mr-2"/>
                    {isAvailable ? "Add to Cart" : "Stock Out"}
                </button>
                </div>
            )}
                
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;