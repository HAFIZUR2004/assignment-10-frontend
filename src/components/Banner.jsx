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
    img: "https://i.ibb.co/gbJF8drd/pexels-pavel-danilyuk-8438969.jpg",
    title: "Innovative AI Solutions",
    subtitle: "Boost productivity and optimize workflows.",
  },
  {
    id: 2,
    img: "https://i.ibb.co/9mh5Qt4v/pexels-thisisengineering-3913031.jpg",
    title: "Professional Analytics Dashboard",
    subtitle: "Monitor, analyze, and improve your AI performance.",
  },
  {
    id: 3,
    img: "https://i.ibb.co/5hKV7jKP/pexels-steve-13978497.jpg",
    title: "Secure & Responsive Design",
    subtitle: "Stay productive on any device with complete data protection.",
  },
  {
    id: 4,
    img: "https://i.ibb.co/99KBysC2/pexels-cottonbro-6153065.jpg",
    title: "Smart Collaboration Tools",
    subtitle: "Collaborate seamlessly across teams with AI tools.",
  },
  {
    id: 5,
    img: "https://i.ibb.co/N6NtbfC8/pexels-pratham-mahajan-2124500-15014777.jpg",
    title: "AI-powered Insights",
    subtitle: "Make data-driven decisions faster and smarter.",
  },
  {
    id: 6,
    img: "https://i.ibb.co/gbJF8drd/pexels-pavel-danilyuk-8438969.jpg",
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Frame */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl group transition-transform duration-700 hover:scale-[1.02]">
              {/* Gradient glow border */}
              <div className="absolute inset-0 p-[3px] rounded-3xl bg-gradient-to-r from-[#016B61] via-[#70B2B2] to-[#9ECFD4] animate-gradient-spin"></div>

              {/* Glassy container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-lg bg-white/10 shadow-[0_0_40px_rgba(1,107,97,0.3)]">
                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                {/* Text Content */}
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-16 left-10 md:left-20 text-white drop-shadow-lg"
                >
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-[#70B2B2]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-[#DFF5F5]">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
