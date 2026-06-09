import ProductCard from "./shared/ProductCard";

const products = [
    {
        image: "/products/apple_iphone_15_pro_max.jpg",
        productName: "iPhone 15 Pro Max",
        description:
          "The latest iPhone with A17 Pro chip, titanium design, 48MP camera system, and all-day battery life. Experience the most powerful iPhone ever made.",
        specialPrice: 1103.99,
        price: 1199.99,
      },
      {
        image: "/products/samsung_galaxy_s24_ultra.jpg",
        productName: "Samsung Galaxy S24 Ultra",
        description:
          "Flagship Samsung phone with Galaxy AI, 200MP camera, S Pen built-in, titanium frame, and stunning 6.8-inch Dynamic AMOLED display.",
        specialPrice: 1169.99,
        price: 1299.99,
      },
      {
        image: "/products/sony_wh_1000xm5_headphones.jpg",
        productName: "Sony WH-1000XM5 Headphones",
        description:
          "Industry-leading noise canceling headphones with exceptional sound quality, 30-hour battery life, and ultra-comfortable design for all-day wear.",
        price: 349.99,
        specialPrice: 307.99,
      }
];

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us
            </h1>
           <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4">
                        Welcome to Vyra! Built by Aditya Alluri, this full-stack
                        e-commerce platform showcases modern web development with
                        Spring Boot, React, PostgreSQL, and Stripe payments. We are
                        dedicated to providing a seamless shopping experience with the
                        highest quality products.
                    </p>
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&h=600&q=80"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"></img>
                </div>
           </div>


           <div className="py-7 space-y-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center">
                Our Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {products.map((product, index) => (
                <ProductCard 
                    key={index}
                    image={product.image}
                    productName={product.productName}
                    description={product.description}
                    specialPrice={product.specialPrice}
                    price={product.price}
                    about
                />
               ))
               }
                

            </div>
           </div>
        </div>
    );
}

export default About;