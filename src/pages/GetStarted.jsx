import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-5xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Get Started</h2>
        <p className="text-lg mb-8">
          Ready to manage your AI models? Register or log in to start adding, viewing, 
          and tracking AI models easily!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
