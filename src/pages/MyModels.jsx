import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyModels = () => {
  const { user } = useContext(AuthContext); // logged-in user
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/models?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setModels(data.data);
        } else {
          setModels([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setModels([]);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading)
    return <p className="text-center mt-10">Loading your models...</p>;

  if (!models || models.length === 0)
    return <p className="text-center mt-10 text-gray-500">You have no models.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My AI Models</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map(model => (
          <div
            key={model._id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={model.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={model.name || "Unnamed Model"}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold mb-1">{model.name || "Unnamed Model"}</h3>
            <p className="text-sm font-medium mb-1">Framework: {model.framework || "N/A"}</p>
            <p className="text-sm font-medium mb-1">Use Case: {model.useCase || "N/A"}</p>
            <p className="text-sm font-medium mb-1">Dataset: {model.dataset || "N/A"}</p>
            <p className="text-gray-700 text-sm">
              {model.description
                ? model.description.length > 100
                  ? model.description.slice(0, 100) + "..."
                  : model.description
                : "No description available"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Added by: {model.createdBy || "You"} | Purchased: {model.purchased || 0}
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

export default MyModels;
