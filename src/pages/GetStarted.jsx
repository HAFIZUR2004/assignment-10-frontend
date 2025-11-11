// GetStarted.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient + Animation */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#016B61] via-[#70B2B2] to-[#9ECFD4] animate-gradient-spin rounded-3xl"
      ></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white rounded-3xl shadow-2xl backdrop-blur-md py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Get Started
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Ready to manage your AI models? Register or log in to start adding, viewing, 
          and tracking AI models easily!
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-[#016B61] font-semibold rounded-2xl hover:bg-gray-100 transition shadow-lg"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-[#016B61] font-semibold rounded-2xl hover:bg-gray-100 transition shadow-lg"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Gradient Animation CSS */}
      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default GetStarted;
