import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  AiOutlineAppstore,
  AiOutlineTool,
  AiOutlineDatabase,
  AiOutlineProfile,
  AiOutlineFileImage,
} from "react-icons/ai";

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

    if (!user) {
      return Swal.fire({
        title: "Oops!",
        text: "You must be logged in to add a model",
        icon: "error",
        confirmButtonColor: "#9ECFD4",
      });
    }

    const modelData = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdBy: user.email || "anonymous",
      createdAt: new Date(),
      purchased: 0,
    };

    try {
      const res = await fetch("http://localhost:3000/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Model added successfully!",
          icon: "success",
          confirmButtonColor: "#70B2B2",
        });
        setName("");
        setFramework("");
        setUseCase("");
        setDataset("");
        setDescription("");
        setImage("");
      } else {
        Swal.fire({
          title: "Oops!",
          text: data.message || "Failed to add model",
          icon: "error",
          confirmButtonColor: "#9ECFD4",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Server error",
        icon: "error",
        confirmButtonColor: "#9ECFD4",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{ backgroundColor: "#70B2B2" }}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-gray-800">
          Add New AI Model
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineAppstore className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Model Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>

          {/* Framework */}
          <div className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineTool className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              required
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>

          {/* Use Case */}
          <div className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineProfile className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Use Case"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              required
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>

          {/* Dataset */}
          <div className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineDatabase className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Dataset"
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              required
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>

          {/* Image URL */}
          <div className="flex items-center border border-gray-300 rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineFileImage className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded outline-none focus:ring-2 focus:ring-[#70B2B2] bg-transparent text-gray-800 resize-none"
          />

          <button
            type="submit"
            className="bg-[#70B2B2] text-white p-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
