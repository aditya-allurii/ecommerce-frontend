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
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={{ enabled: false }}
                breakpoints={{
                    1024: {
                        navigation: {
                            enabled: true,
                        }
                    }
                }}
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={1}>

                {bannerLists.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]} overflow-hidden`}>
                            <div className='flex items-center justify-between w-full h-full'>
                                {/* Text Section - now visible on all screens */}
                                <div className='flex flex-col justify-center items-center w-1/2 h-full p-4 lg:p-8 text-center'>
                                    <h3 className='text-lg lg:text-3xl text-white font-bold'>
                                        {item.title}
                                    </h3>
                                    <h1 className='text-2xl lg:text-5xl text-white font-bold mt-2'>
                                        {item.subtitle}
                                    </h1>
                                    <p className='hidden lg:block text-white font-bold mt-4'>
                                        {item.description}
                                    </p>
                                    <Link
                                        className='mt-4 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors text-sm lg:text-base'
                                        to={item.category ? `/products?category=${encodeURIComponent(item.category)}` : "/products"}>
                                        Shop
                                    </Link>
                                </div>

                                {/* Image Section */}
                                {item.id <= 3 ? (
                                    <div className='w-1/2 h-full flex items-center justify-center p-4 lg:p-8'>
                                        <img
                                            className='max-h-full max-w-full object-contain'
                                            src={item?.image}
                                            alt={item?.title}
                                        />
                                    </div>
                                ) : (
                                    <div className='w-1/2 h-full'>
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