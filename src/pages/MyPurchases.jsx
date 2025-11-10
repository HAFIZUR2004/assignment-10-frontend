import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyPurchases = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPurchases = async () => {
      try {
        const res = await fetch(`http://localhost:3000/purchases?email=${user.email}`);
        const data = await res.json();
        if (data.success) setPurchases(data.data);
        else toast.error("Failed to fetch purchases");
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to view your purchases.</p>;
  if (loading) return <p className="text-center mt-10">Loading your purchases...</p>;
  if (purchases.length === 0) return <p className="text-center mt-10 text-gray-500">No purchases yet.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Purchases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.map((purchase) => (
          <div key={purchase._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img
              src={purchase.modelDetails.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={purchase.modelDetails.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold mb-1">{purchase.modelDetails.name}</h3>
            <p className="text-sm font-medium mb-1">Framework: {purchase.modelDetails.framework}</p>
            <p className="text-sm mb-1">Use Case: {purchase.modelDetails.useCase}</p>
            <p className="text-gray-500 text-sm mb-2">
              Purchased At: {new Date(purchase.purchasedAt).toLocaleString()}
            </p>
            <Link
              to={`/models/${purchase.modelDetails._id}`}
              className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
