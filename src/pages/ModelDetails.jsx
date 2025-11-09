import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ModelDetails = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/models/${id}`)
      .then(res => res.json())
      .then(data => setModel(data))
      .catch(err => console.error("Error fetching model:", err));

    // Increment purchase/view count
    fetch(`http://localhost:3000/models/${id}/purchase`, {
      method: "POST",
    }).catch(err => console.error("Error updating view count:", err));
  }, [id]);

  if (!model) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <img src={model.image} alt={model.name} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{model.name}</h2>
      <p className="text-gray-600 mb-2">Framework: {model.framework}</p>
      <p className="text-gray-600 mb-2">Use Case: {model.useCase}</p>
      <p className="text-gray-600 mb-2">Dataset: {model.dataset}</p>
      <p className="text-gray-700 mt-4">{model.description}</p>
      <div className="mt-6 flex justify-between text-gray-500 text-sm">
        <p>Added by: {model.createdBy}</p>
        <p>Views: {model.purchased}</p>
      </div>
    </div>
  );
};

export default ModelDetails;
