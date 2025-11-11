import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const frameworks = [
  "All",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "Hugging Face Transformers",
  "MXNet",
  "JAX",
  "ONNX",
  "OpenVINO",
  "Caffe",
  "FastAI",
  "Theano"
];

const ViewModels = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState(["All"]);

  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setModels(data.data);
          setFilteredModels(data.data);
        } else {
          setModels([]);
          setFilteredModels([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setModels([]);
        setFilteredModels([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFiltering(true);
    const timer = setTimeout(() => {
      let temp = [...models];

      // Framework filter
      if (!selectedFrameworks.includes("All")) {
        temp = temp.filter((model) =>
          selectedFrameworks.includes(model.framework)
        );
      }

      // Search filter
      if (searchTerm.trim() !== "") {
        temp = temp.filter((model) =>
          model.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredModels(temp);
      setFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFrameworks, models]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner loading-xl text-[#016B61]"></span>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#016B61]">
        All AI Models
      </h2>

      {/* Search & Framework Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <label className="flex items-center w-full md:w-1/2 border-2 border-[#016B61] rounded-xl px-3 py-2 bg-white shadow-md hover:shadow-lg transition">
          <svg
            className="h-5 w-5 opacity-50 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            className="grow outline-none text-[#016B61] placeholder:text-[#70B2B2]"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        {/* Framework Select */}
        <select
          multiple
          className="select select-secondary w-full md:w-1/3 border-2 border-[#016B61] rounded-xl px-2 py-2 bg-white text-[#016B61] shadow-md hover:shadow-lg transition"
          value={selectedFrameworks}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
            setSelectedFrameworks(options.includes("All") ? ["All"] : options);
          }}
        >
          {frameworks.map((fw) => (
            <option key={fw} value={fw}>
              {fw}
            </option>
          ))}
        </select>
      </div>

      {/* Filtering Spinner */}
      {filtering && (
        <div className="flex justify-center items-center my-10">
          <span className="loading loading-spinner loading-xl text-[#016B61]"></span>
        </div>
      )}

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.length === 0 && !filtering && (
          <p className="text-center text-gray-500 col-span-full">No models found</p>
        )}

        {filteredModels.map((model) => (
          <div
            key={model._id}
            className="relative rounded-3xl overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#9ECFD4] via-[#70B2B2] to-[#016B61] animate-gradient-spin"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl overflow-hidden border-4 border-transparent">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={model.image || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt={model.name}
                  className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-5 bg-[#E5E9C5]">
                <h3 className="text-xl text-[#016B61] md:text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-sm text-[#016B61] font-medium mb-2">Framework: {model.framework}</p>
                <p className="text-[#016B61] text-sm mb-4">
                  {model.description ? model.description.slice(0, 30) + "..." : "No description"}
                </p>

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

      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ViewModels;
