import React from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import PageTitle from "../PageTitle";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

export default function Messages() {
  const messages = useLoaderData();
  const revalidator = useRevalidator();

  const handleCloseMessage = async (contactId) => {
    try {
      await apiClient.patch(`/admin/messages/${contactId}/close`);
      toast.success("Message closed");
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to close message");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl font-primary">
      <div className="text-center mb-12">
        <PageTitle title="Admin Contact Messages" />
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-gray-500 font-medium">No open messages found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((message) => (
            <div
              key={message.contactId}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-dark dark:text-white">{message.name}</h3>
                      <p className="text-sm text-gray-500">{message.email} • {message.mobileNumber}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl mt-2">
                    <p className="text-gray-700 dark:text-gray-300 italic">"{message.message}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 justify-center">
                  <button
                    onClick={() => handleCloseMessage(message.contactId)}
                    className="px-6 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function messagesLoader() {
  try {
    const response = await apiClient.get("/admin/messages"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch messages. Please try again.",
      { status: error.status || 500 }
    );
  }
}