import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/productApi";
import { getCategories } from "../apis/categoryApi";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Products
      const productRes = await getProducts();
      const products = productRes.data.data || [];

      setTotalProducts(products.length);

      // Expired products count
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expired = products.filter((p) => {
        const exp = new Date(p.expiryDate);
        exp.setHours(0, 0, 0, 0);
        return exp < today;
      });

      setExpiredCount(expired.length);

      // Categories
      const categoryRes = await getCategories();
      setTotalCategories(categoryRes.data.data.length);
    } catch (err) {
      console.error("Dashboard load failed");
    }
  };
return (
  <div className=" ">
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h2>
      <p className="text-sm text-gray-500">
        Overview of products and categories
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Total Products */}
      <div className="bg-white shadow border-l-4 border-purple-600 p-6">
        <p className="text-sm text-gray-500 mb-1">
          Total Products
        </p>
        <h3 className="text-3xl font-semibold text-gray-900">
          {totalProducts}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          All active products
        </p>
      </div>

      {/* Total Categories */}
      <div className="bg-white shadow border-l-4 border-indigo-600 p-6">
        <p className="text-sm text-gray-500 mb-1">
          Total Categories
        </p>
        <h3 className="text-3xl font-semibold text-gray-900">
          {totalCategories}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Product classifications
        </p>
      </div>

      {/* Expired Products */}
      <div className="bg-white shadow border-l-4 border-red-600 p-6">
        <p className="text-sm text-gray-500 mb-1">
          Expired Products
        </p>
        <h3 className="text-3xl font-semibold text-gray-900">
          {expiredCount}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Needs immediate action
        </p>
      </div>

    </div>
  </div>
);

};

export default Dashboard;
