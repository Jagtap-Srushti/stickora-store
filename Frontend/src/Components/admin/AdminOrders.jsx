import React from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import PageTitle from "../PageTitle";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const orders = useLoaderData();
  const revalidator = useRevalidator();

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const handleConfirm = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/confirm`);
      toast.success("Order confirmed.");
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to confirm order.");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/cancel`);
      toast.success("Order cancelled.");
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to cancel order.");
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-6 py-12 font-primary bg-gray-50 dark:bg-darkbg">
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-primary dark:text-lighter">
          No orders found.
        </p>
      ) : (
        <div className="space-y-8 mt-4 max-w-4xl mx-auto">
          <PageTitle title="Admin Orders Management" />
          
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl p-8 transition-all hover:shadow-md"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order #{order.orderId}
                  </h2>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>Status: <span className="font-semibold text-primary dark:text-lighter">{order.status}</span></p>
                    <p>Date: {formatDate(order.createdAt)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleConfirm(order.orderId)}
                    className="px-5 py-2 text-sm font-semibold text-white rounded-lg bg-primary hover:bg-opacity-90 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(order.orderId)}
                    className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Total: ${order.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function adminOrdersLoader() {
  try {
    const response = await apiClient.get("/admin/orders"); // Axios GET Request
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