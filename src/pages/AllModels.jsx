import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllModels = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error("Error fetching models:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All AI Models</h2>
      {models.length === 0 ? (
        <p className="text-center text-gray-500">No models found</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {models.map((model) => (
            <div key={model._id} className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
              <img src={model.image} alt={model.name} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-3">{model.name}</h3>
              <p className="text-gray-600 text-sm">Framework: {model.framework}</p>
              <p className="text-gray-600 text-sm mb-3">Use Case: {model.useCase}</p>
              <Link
                to={`/models/${model._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllModels;
