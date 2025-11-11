// Footer.jsx
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-5 mb-2 py-10 px-4 md:px-10 bg-gradient-to-r from-[#016B61] via-[#70B2B2] to-[#9ECFD4] rounded-3xl shadow-inner text-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg md:text-xl font-medium mb-4">
          © 2025 AI Model Inventory Manager
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="https://github.com/your-client-repo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <FaGithub /> Client Repo
          </a>
          <a
            href="https://github.com/your-server-repo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <FaGithub /> Server Repo
          </a>
        </div>
      </div>

      {/* Optional subtle animated gradient effect */}
      <div className="absolute inset-0 opacity-20 animate-gradient-spin rounded-3xl pointer-events-none"></div>

      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background: linear-gradient(135deg, #016B61, #70B2B2, #9ECFD4);
          background-size: 200% 200%;
          animation: gradient-spin 12s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
