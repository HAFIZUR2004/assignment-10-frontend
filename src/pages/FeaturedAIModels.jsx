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
    return <p className="text-center mt-10">Loading Featured Models...</p>;

  if (models.length === 0)
    return <p className="text-center mt-10 text-gray-500">No models available</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured AI Models</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model._id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={
                model.image ||
                "https://via.placeholder.com/300x200?text=No+Image+Available"
              }
              alt={model.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
            <p className="text-sm font-medium mb-1">Framework: {model.framework}</p>
            <p className="text-gray-700 text-sm">
              {model.description.length > 100
                ? model.description.slice(0, 100) + "..."
                : model.description}
            </p>
            <Link
              to={`/models/${model._id}`}
              className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedModels;
