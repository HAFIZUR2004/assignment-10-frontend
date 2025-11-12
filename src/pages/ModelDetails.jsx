import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaDatabase, FaTools, FaShoppingCart, FaRobot } from "react-icons/fa";
import { MdDescription, MdEdit, MdDelete } from "react-icons/md";
import { SiFramework } from "react-icons/si";

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
        const res = await fetch(`https://ai-model-inventory-server.vercel.app/models/${id}`);
        const data = await res.json();
        if (data.success) {
          setModel(data.data);
          setPurchased(data.data.purchased || 0);
        } else toast.error("Model not found");
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchModel();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this model?")) return;
    try {
      const res = await fetch(`https://ai-model-inventory-server.vercel.app/models/${id}`, { method: "DELETE" });
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
      await fetch("https://ai-model-inventory-server.vercel.app/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId: id, userEmail: user.email }),
      });

      await fetch(`https://ai-model-inventory-server.vercel.app/models/${id}/purchase`, { method: "POST" });

      setPurchased(prev => prev + 1);
      toast.success("Model purchased successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-xl text-[#016B61]"></span>
      </div>
    );

  if (!model)
    return <p className="text-center mt-10 text-gray-500">Model not found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="relative flex flex-col md:flex-row items-center gap-8 min-h-[28rem] 
                      p-8 rounded-3xl shadow-2xl bg-white border-4 border-transparent
                      transition-transform duration-500 hover:scale-[1.02] animate-border-gradient">
        
        {/* Left - Image */}
        <div className="md:w-1/2 w-full z-10">
          <img
            src={model.image || "https://via.placeholder.com/500x300?text=No+Image"}
            alt={model.name}
            className="w-full h-96 object-cover rounded-3xl shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 w-full text-[#016B61] space-y-3 z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <FaRobot /> {model.name}
          </h2>

          <p className="flex items-center gap-2 text-lg md:text-xl">
            <SiFramework /> <strong>Framework:</strong> {model.framework}
          </p>

          <p className="flex items-center gap-2 text-lg md:text-xl">
            <FaTools /> <strong>Use Case:</strong> {model.useCase}
          </p>

          <p className="flex items-center gap-2 text-lg md:text-xl">
            <FaDatabase /> <strong>Dataset:</strong> {model.dataset}
          </p>

          <p className="flex items-start gap-2 text-base md:text-lg leading-relaxed">
            <MdDescription className="mt-1" /> <strong>Description:</strong> {model.description}
          </p>

          <p className="text-gray-500 mt-3 text-lg">
            <FaShoppingCart className="inline mr-2" />
            Purchased: <strong>{purchased}</strong> times
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {user?.email === model.createdBy && (
              <>
                <button
                  className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-2xl hover:bg-yellow-600 transition"
                  onClick={() => navigate(`/update-model/${id}`)}
                >
                  <MdEdit /> Edit
                </button>
                <button
                  className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-2xl hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  <MdDelete /> Delete
                </button>
              </>
            )}

            <button
              className="flex items-center gap-2 bg-[#016B61] text-white px-6 py-2 rounded-2xl hover:bg-[#014d45] transition"
              onClick={handlePurchase}
            >
              <FaShoppingCart /> Purchase Model
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Border Animation */}
      
    </div>
  );
};

export default ModelDetails;
