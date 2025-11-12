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
        const res = await fetch(`https://ai-model-inventory-server.vercel.app/purchases?email=${user.email}`);
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

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Please login to view your purchases.</p>;

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner loading-xl text-[#016B61]"></span>
      </div>
    );

  if (purchases.length === 0)
    return <p className="text-center mt-10 text-gray-500">No purchases yet.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#016B61]">My Purchases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="relative rounded-3xl overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#9ECFD4] via-[#70B2B2] to-[#016B61] animate-gradient-spin"></div>

            {/* Card Content */}
            <div className="relative bg-white rounded-3xl overflow-hidden border-4 border-transparent">
              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={purchase.modelDetails.image || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt={purchase.modelDetails.name || "Unnamed Model"}
                  className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 bg-[#E5E9C5]">
                <h3 className="text-xl text-[#016B61] md:text-2xl font-bold mb-2">
                  {purchase.modelDetails.name || "Unnamed Model"}
                </h3>
                <p className="text-sm text-[#016B61] font-medium mb-1">
                  Framework: {purchase.modelDetails.framework || "N/A"}
                </p>
                <p className="text-sm text-[#016B61] mb-2">
                  Use Case: {purchase.modelDetails.useCase || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Purchased At: {new Date(purchase.purchasedAt).toLocaleString()}
                </p>

                {/* Button */}
                <Link
                  to={`/models/${purchase.modelDetails._id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-[#016B61] text-white font-semibold rounded-xl hover:bg-[#014d45] transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Gradient CSS */}
      <style>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MyPurchases;
