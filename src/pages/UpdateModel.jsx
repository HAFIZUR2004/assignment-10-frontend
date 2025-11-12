// UpdateModel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { AiOutlineAppstore, AiOutlineTool, AiOutlineDatabase, AiOutlineProfile, AiOutlineFileImage } from "react-icons/ai";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    framework: "",
    useCase: "",
    dataset: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await fetch(`https://ai-model-inventory-server.vercel.app/models/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            name: data.data.name,
            framework: data.data.framework,
            useCase: data.data.useCase,
            dataset: data.data.dataset,
            description: data.data.description,
            image: data.data.image,
          });

          if (user?.email !== data.data.createdBy) {
            toast.error("You are not allowed to edit this model", {
              icon: <FaExclamationCircle className="text-red-500" />,
            });
            navigate(`/models/${id}`);
          }
        } else {
          toast.error("Model not found", {
            icon: <FaExclamationCircle className="text-red-500" />,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error. Please try again later", {
          icon: <FaExclamationCircle className="text-red-500" />,
        });
      }
      setLoading(false);
    };

    fetchModel();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`https://ai-model-inventory-server.vercel.app/models/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Model updated successfully!", {
          icon: <FaCheckCircle className="text-green-500" />,
        });
        navigate(`/models/${id}`);
      } else {
        toast.error("Failed to update model", {
          icon: <FaExclamationCircle className="text-red-500" />,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later", {
        icon: <FaExclamationCircle className="text-red-500" />,
      });
    }
    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10 gap-2">
        <span className="loading loading-spinner loading-xl"></span>
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-gray-800">
          Update Model
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {["name", "framework", "useCase", "dataset", "image"].map((field) => (
            <div key={field} className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-blue-500">
              {field === "name" && <AiOutlineAppstore className="text-gray-400 mr-2 text-xl" />}
              {field === "framework" && <AiOutlineTool className="text-gray-400 mr-2 text-xl" />}
              {field === "useCase" && <AiOutlineProfile className="text-gray-400 mr-2 text-xl" />}
              {field === "dataset" && <AiOutlineDatabase className="text-gray-400 mr-2 text-xl" />}
              {field === "image" && <AiOutlineFileImage className="text-gray-400 mr-2 text-xl" />}
              <input
                type="text"
                name={field}
                placeholder={field === "useCase" ? "Use Case" : field === "image" ? "Image URL" : field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent text-gray-800"
              />
            </div>
          ))}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-transparent text-gray-800"
          />

          <button
            type="submit"
            disabled={submitting}
            className={`mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
              submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {submitting && <span className="loading loading-spinner loading-xl"></span>}
            {submitting ? "Updating..." : "Update Model"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
