import React from "react";
import apiClient from "../api/apiClient";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import PageTitle from "./PageTitle";

const StatusBadge = ({ status }) => {
  const styles = {
    CREATED: "bg-blue-100 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || "bg-gray-100"}`}>
      {status}
    </span>
  );
};

export default function Orders() {
  const orders = useLoaderData();

  const formatDate = (isoDate) => 
    new Date(isoDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <PageTitle title="My Orders" />
      
      {orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl"
        >
          <p className="text-gray-500">No orders found.</p>
        </motion.div>
      ) : (
        <div className="space-y-8 mt-8">
          {orders.map((order, index) => (
            <motion.div 
              key={order.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} // Staggered entrance
              whileHover={{ y: -4 }} // Subtle lift on hover
              className="bg-white dark:bg-cardbg-dark border border-gray-100 dark:border-border-dark rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="bg-gray-50/50 dark:bg-darkbg px-6 py-4 border-b border-gray-100 dark:border-border-dark flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                  <p className="font-bold text-dark dark:text-white">#{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Placed on</p>
                  <p className="font-semibold text-gray-600 dark:text-gray-300">{formatDate(order.createdAt)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="p-6 space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="overflow-hidden rounded-xl">
                      <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-dark dark:text-white">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-dark dark:text-white">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50/50 dark:bg-darkbg border-t border-gray-100 dark:border-border-dark flex justify-end items-center">
                <span className="text-sm text-gray-500 mr-4">Total Amount:</span>
                <p className="text-lg font-bold text-dark dark:text-white">${order.totalPrice.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch orders. Please try again.",
      { status: error.status || 500 }
    );
  }
}