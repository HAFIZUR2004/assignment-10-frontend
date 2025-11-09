// UpdateModel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [framework, setFramework] = useState("");
  const [useCase, setUseCase] = useState("");
  const [dataset, setDataset] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/models/${id}`);
        const data = await res.json();
        if (data.success) {
          setModel(data.data);

          // Pre-fill form
          setName(data.data.name);
          setFramework(data.data.framework);
          setUseCase(data.data.useCase);
          setDataset(data.data.dataset);
          setDescription(data.data.description);
          setImage(data.data.image);

          if (user?.email !== data.data.createdBy) {
            toast.error("You are not allowed to edit this model");
            navigate(`/models/${id}`);
          }
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
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { name, framework, useCase, dataset, description, image };

    try {
      const res = await fetch(`http://localhost:3000/models/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Model updated successfully!");
        navigate(`/models/${id}`);
      } else {
        toast.error("Failed to update model");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!model) return <p className="text-center mt-10 text-gray-500">Model not found</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Model</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Framework"
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Use Case"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Dataset"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700"
        >
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
