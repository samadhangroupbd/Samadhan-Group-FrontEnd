import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonialsData from '../../../../../public/Testimonials.json'; // Adjust the path if necessary

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        setTestimonials(testimonialsData);
        // console.log('Testimonials loaded:', testimonialsData); // Debugging
    }, []);

    return (
        <div className="bg-gray-100 p-8">
            <h1 className="text-4xl font-bold leading-none text-center mb-8 text-gray-800">What Our Customers Are Saying About Us</h1>
            
            {/* New Text Below Title */}
            <p className="text-lg text-center text-gray-600 mb-4">
                We value our customers' feedback and strive to improve our services based on their experiences.
            </p>

            <div className="flex flex-col md:flex-row">
                {/* Lottie Animation */}
                <div className="relative w-full md:w-1/3 overflow-hidden">
                    <iframe
                        src="https://lottie.host/embed/3cb8e441-4969-4715-b8b3-cf3fdc461b01/ovFv4DhDcY.json"
                        className="w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105"
                        frameBorder="0"
                        title="Testimonials Animation"
                    ></iframe>
                </div>

                {/* Testimonials Slider */}
                <div className="relative w-full md:w-2/3 p-6">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true} // Enable looping
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            640: {
                                slidesPerView: 1, // 1 slide on small screens
                            },
                            768: {
                                slidesPerView: 1, // 1 slide on medium screens
                            },
                            1024: {
                                slidesPerView: 2, // 2 slides on large screens
                            },
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="flex flex-col max-w-sm mx-auto my-6 shadow-lg rounded-lg overflow-hidden h-96">
                                {/* Testimonial Content */}
                                <div className="px-8 py-8 rounded-t-lg bg-white h-full lg:h-64">
                                    <p className="relative px-6 py-2 text-lg italic text-center text-gray-800 h-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-600 absolute left-0">
                                            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                        </svg>
                                        <div className="px-2">{testimonial.testimonial}</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-600">
                                            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                        </svg>
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-gradient-to-r from-violet-600 to-purple-500 text-gray-800 h-full">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full border-2 border-white" />
                                    <p className="text-xl font-semibold leading-tight">{testimonial.name}</p>
                                    <div className="flex items-center text-sm">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-500 text-xl">★</span>
                                        ))}
                                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-gray-300 text-xl">★</span>
                                        ))}
                                    </div>
                                    <p className="text-sm uppercase text-gray-700 mt-1">{new Date(testimonial.date).toLocaleDateString()}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;