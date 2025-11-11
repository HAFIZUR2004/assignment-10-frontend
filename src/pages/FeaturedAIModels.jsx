// FeaturedModels.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://localhost:3000/models/latest");
        const data = await res.json();
        if (data.success) {
          setModels(data.data);
        } else {
          console.error("Failed to fetch models");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading Featured Models...</p>;

  if (models.length === 0)
    return <p className="text-center mt-10 text-gray-500">No models available</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#016B61]">
        Featured AI Models
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <div
            key={model._id}
            className="relative rounded-3xl overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-gradient-spin"></div>

            {/* Card Content */}
            <div className="relative bg-white rounded-3xl overflow-hidden border-4 border-transparent">
              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={
                    model.image ||
                    "https://via.placeholder.com/400x250?text=No+Image+Available"
                  }
                  alt={model.name}
                  className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 bg-[#E5E9C5]">
                <h3 className="text-xl text-[#016B61] md:text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-sm text-[#016B61] font-medium mb-2">Framework: {model.framework}</p>
                <p className="text-[#016B61] text-sm mb-4">
                  {model.description.slice(0, 30)}...
                </p>

                {/* Button */}
                <Link
                  to={`/models/${model._id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-[#016B61] text-white font-semibold rounded-xl hover:bg-[#014d45] transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for animated gradient border */}
      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturedModels;
