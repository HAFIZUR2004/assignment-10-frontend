// AboutAIModels.jsx
import React from "react";
import { motion } from "framer-motion";

const AboutAIModels = () => {
  return (
    <section className="py-20 relative">
      {/* Gradient Background */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #E5E9C5, #9ECFD4, #70B2B2, #016B61)",
        }}
      >
        {/* Overlay for subtle animation */}
        <div className="absolute inset-0 bg-black/10 animate-gradient-spin"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 relative">
          {/* Card Box */}
          <motion.div
            className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              About AI Models
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              AI models are computer programs trained to perform specific tasks using data.
              They can be used in a variety of applications, such as chatbots, image recognition,
              natural language processing, and predictive analytics. By understanding and organizing
              AI models, developers can build smarter and more efficient systems.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutAIModels;
