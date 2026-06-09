// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

const colors = [
    "bg-banner-color1", 
    "bg-banner-color2", 
    "bg-banner-color3", 
    "bg-custom-gradient", 
    "bg-slate-800"
];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-md'>
            <Swiper
                grabCursor = {true}
                autoplay = {{
                    delay:4000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{clickable: true}}
                scrollbar={{ draggable: true}}
                slidesPerView={1}>

                    {bannerLists.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]} overflow-hidden`}>
                                <div className='flex items-center justify-between w-full h-full'>
                                    {/* Text Section */}
                                    <div className='hidden lg:flex flex-col justify-center items-center w-1/2 h-full p-8 text-center'>
                                        <h3 className='text-3xl text-white font-bold'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-5xl text-white font-bold mt-2'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white font-bold mt-4'>
                                            {item.description}
                                        </p>
                                        <Link 
                                            className='mt-6 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors'
                                            to={item.category ? `/products?category=${encodeURIComponent(item.category)}` : "/products"}>
                                            Shop
                                        </Link>
                                    </div>
                                    
                                    {/* Image Section */}
                                    {item.id <= 3 ? (
                                        // Product Cutouts (Sofa, TV, Laptop) - contained and padded
                                        <div className='w-full h-full flex items-center justify-center lg:w-1/2 p-8'>
                                            <img 
                                                className='max-h-full max-w-full object-contain' 
                                                src={item?.image} 
                                                alt={item?.title} 
                                            />
                                        </div>
                                    ) : (
                                        // Full Photographic Banners (Beauty, Sports) - full bleed fit
                                        <div className='w-full h-full lg:w-1/2'>
                                            <img 
                                                className='w-full h-full object-cover' 
                                                src={item?.image} 
                                                alt={item?.title} 
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}


export default HeroBanner;