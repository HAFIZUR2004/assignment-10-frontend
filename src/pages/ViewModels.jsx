import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewModels = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);

  // Fetch all models
  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setModels(data.data);
          setFilteredModels(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle search and filter
  useEffect(() => {
    let temp = [...models];

    // Filter by framework
    if (selectedFrameworks.length > 0) {
      temp = temp.filter((model) => selectedFrameworks.includes(model.framework));
    }

    // Filter by search term
    if (searchTerm) {
      temp = temp.filter((model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredModels(temp);
  }, [searchTerm, selectedFrameworks, models]);

  if (loading) return <p className="text-center mt-10">Loading Models...</p>;
  if (filteredModels.length === 0)
    return <p className="text-center mt-10 text-gray-500">No models found</p>;

  // Get unique frameworks for filter dropdown
  const frameworks = [...new Set(models.map((m) => m.framework))];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All AI Models</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          multiple
          className="border p-2 rounded w-full md:w-1/3"
          value={selectedFrameworks}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
            setSelectedFrameworks(options);
          }}
        >
          {frameworks.map((fw) => (
            <option key={fw} value={fw}>
              {fw}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <div
            key={model._id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            {model.image && (
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-semibold mb-1">{model.name}</h3>
            <p className="text-sm font-medium mb-1">Framework: {model.framework}</p>
            <p className="text-sm font-medium mb-1">Use Case: {model.useCase}</p>
            <p className="text-sm font-medium mb-1">Dataset: {model.dataset}</p>
            <p className="text-gray-700 text-sm">
              {model.description.length > 100
                ? model.description.slice(0, 100) + "..."
                : model.description}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Added by: {model.createdBy} | Purchased: {model.purchased}
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

export default ViewModels;
