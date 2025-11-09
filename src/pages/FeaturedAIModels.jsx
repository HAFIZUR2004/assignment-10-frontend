import React, { useEffect, useState } from "react";

const FeaturedAIModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://localhost:3000/models/latest"); // backend API
        const data = await res.json();
        setModels(data.slice(0, 6)); // সর্বশেষ 6টি model দেখাবে
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
          Featured AI Models
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model) => (
            <div
              key={model._id}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{model.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Framework: {model.framework}
              </p>
              <p className="text-gray-700">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAIModels;
