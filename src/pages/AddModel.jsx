import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const AddModel = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [framework, setFramework] = useState("");
  const [useCase, setUseCase] = useState("");
  const [dataset, setDataset] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to add a model");

    const modelData = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdBy: user.email,
    };

    try {
      const res = await fetch("http://localhost:3000/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Model added successfully!");
        setName("");
        setFramework("");
        setUseCase("");
        setDataset("");
        setDescription("");
        setImage("");
      } else {
        toast.error(data.message || "Failed to add model");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Server error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New AI Model</h2>
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
          Add Model
        </button>
      </form>
    </div>
  );
};

export default AddModel;
