import React, { useState } from "react";

const slides = [
  { id: 1, title: "Manage AI Models Easily", image: "https://i.ibb.co.com/fGHMQ8wn/img1.webp" },
  { id: 2, title: "Track Your Model Purchases", image: "https://i.ibb.co.com/bjdf2hM3/img2.webp" },
  { id: 3, title: "Secure and Responsive Design", image: "https://i.ibb.co.com/tMwrSZ1N/img3.webp" },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <h2 className="absolute bottom-5 left-5 text-white text-3xl font-bold">{slide.title}</h2>
        </div>
      ))}

      {/* Navigation buttons */}
      <button onClick={prevSlide} className="absolute top-1/2 left-2 text-white text-3xl transform -translate-y-1/2">❮</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 text-white text-3xl transform -translate-y-1/2">❯</button>
    </div>
  );
};

export default Banner;
