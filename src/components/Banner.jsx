// HeroSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co.com/gbJF8drd/pexels-pavel-danilyuk-8438969.jpg",
    title: "Innovative AI Solutions",
    subtitle: "Boost productivity and optimize workflows.",
  },
  {
    id: 2,
    img: "https://i.ibb.co.com/9mh5Qt4v/pexels-thisisengineering-3913031.jpg",
    title: "Professional Analytics Dashboard",
    subtitle: "Monitor, analyze, and improve your AI performance.",
  },
  {
    id: 3,
    img: "https://i.ibb.co.com/5hKV7jKP/pexels-steve-13978497.jpg",
    title: "Secure & Responsive Design",
    subtitle: "Stay productive on any device with complete data protection.",
  },
  {
    id: 4,
    img: "https://i.ibb.co.com/99KBysC2/pexels-cottonbro-6153065.jpg",
    title: "Smart Collaboration Tools",
    subtitle: "Collaborate seamlessly across teams with AI tools.",
  },
  {
    id: 5,
    img: "https://i.ibb.co.com/N6NtbfC8/pexels-pratham-mahajan-2124500-15014777.jpg",
    title: "AI-powered Insights",
    subtitle: "Make data-driven decisions faster and smarter.",
  },
  {
    id: 6,
    img: "https://i.ibb.co.com/93wfb0Vj/pexels-pavel-danilyuk-8438918.jpg",
    title: "Future-ready Technology",
    subtitle: "Integrate AI solutions that scale with your business.",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[85vh] mt-5 flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-full w-[95%]"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            {/* Slider Frame with border & border-radius */}
            <div className="w-full h-full rounded-4xl   overflow-hidden relative group shadow-2xl transition-transform duration-500 hover:scale-105">
              {/* Slide Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Brighter Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/20 rounded-5xl"></div>

              {/* Content */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 text-[#016B61]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-4">{slide.subtitle}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
