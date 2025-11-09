// ModelDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ModelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(0);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/models/${id}`);
        const data = await res.json();
        if (data.success) {
          setModel(data.data);
          setPurchased(data.data.purchased || 0);
        } else {
          toast.error("Model not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
      setLoading(false);
    };

    fetchModel();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this model?")) return;
    try {
      const res = await fetch(`http://localhost:3000/models/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Model deleted successfully");
        navigate("/models");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handlePurchase = async () => {
    if (!user) return toast.error("You must be logged in to purchase");

    try {
      // 1️⃣ Add to purchases collection
      await fetch("http://localhost:3000/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: id,
          userEmail: user.email,
          purchasedAt: new Date(),
        }),
      });

      // 2️⃣ Increment purchased count
      await fetch(`http://localhost:3000/models/${id}/purchase`, { method: "POST" });

      // 3️⃣ Update UI
      setPurchased(prev => prev + 1);
      toast.success("Model purchased successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!model) return <p className="text-center mt-10 text-gray-500">Model not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <img
        src={model.image || "https://via.placeholder.com/500x300?text=No+Image"}
        alt={model.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{model.name}</h2>
      <p className="mb-1"><strong>Framework:</strong> {model.framework}</p>
      <p className="mb-1"><strong>Use Case:</strong> {model.useCase}</p>
      <p className="mb-1"><strong>Dataset:</strong> {model.dataset}</p>
      <p className="mb-2"><strong>Description:</strong> {model.description}</p>
      <p className="text-gray-500 mb-4">Purchased: {purchased} times</p>

      {/* Only show Edit/Delete if logged-in user is creator */}
      {user?.email === model.createdBy && (
        <div className="flex gap-2 mb-4">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            onClick={() => navigate(`/update-model/${id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePurchase}
      >
        Purchase Model
      </button>
    </div>
  );
};

export default ModelDetails;
