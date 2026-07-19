import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Form, useLoaderData, useActionData, useNavigation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Profile() {
  const initialProfileData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { loginSuccess, logout } = useAuth();

  const [profileData, setProfileData] = useState(initialProfileData);

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        logout();
        toast.success("Logged out successfully! Login again with updated email");
        navigate("/login");
      } else {
        toast.success("Your Profile details are saved successfully!");
        setProfileData(actionData.profileData);
        if (actionData.profileData) {
          const updatedUser = { ...profileData, ...actionData.profileData };
          loginSuccess(localStorage.getItem("jwtToken"), updatedUser);
        }
      }
    }
  }, [actionData]);

  // Helper to handle nested address updates
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const cardStyle = "bg-white dark:bg-cardbg-dark p-8 rounded-2xl shadow-sm border border-light/20 dark:border-border-dark";
  const sectionTitleStyle = "text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2";
  const inputContainerStyle = "space-y-1.5";
  const labelStyle = "text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1";
  const textFieldStyle = "w-full px-4 py-3 rounded-xl border border-light/60 dark:border-border-dark bg-lighter/30 dark:bg-darkbg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-dark dark:text-white">Account Settings</h1>
      </div>

      <Form method="PUT" className="space-y-8">
        <div className={cardStyle}>
          <h2 className={sectionTitleStyle}>👤 Personal Details</h2>
          <div className="space-y-5">
            <div className={inputContainerStyle}>
              <label className={labelStyle}>Full Name</label>
              <input name="name" className={textFieldStyle} value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={inputContainerStyle}>
                <label className={labelStyle}>Email Address</label>
                <input name="email" className={textFieldStyle} value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} required />
              </div>
              <div className={inputContainerStyle}>
                <label className={labelStyle}>Mobile Number</label>
                <input name="mobileNumber" className={textFieldStyle} value={profileData.mobileNumber} onChange={(e) => setProfileData({...profileData, mobileNumber: e.target.value})} required />
              </div>
            </div>
          </div>
        </div>

        <div className={cardStyle}>
          <h2 className={sectionTitleStyle}>📍 Address Details</h2>
          <div className="space-y-5">
            <div className={inputContainerStyle}>
              <label className={labelStyle}>Street Address</label>
              <input name="street" className={textFieldStyle} value={profileData.address?.street || ""} onChange={handleAddressChange} required />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <div className={inputContainerStyle}>
                <label className={labelStyle}>City</label>
                <input name="city" className={textFieldStyle} value={profileData.address?.city || ""} onChange={handleAddressChange} required />
              </div>
              <div className={inputContainerStyle}>
                <label className={labelStyle}>State</label>
                <input name="state" className={textFieldStyle} value={profileData.address?.state || ""} onChange={handleAddressChange} required />
              </div>
              <div className={inputContainerStyle}>
                <label className={labelStyle}>Postal Code</label>
                <input name="postalCode" className={textFieldStyle} value={profileData.address?.postalCode || ""} onChange={handleAddressChange} required />
              </div>
            </div>
            {/* Added missing country field */}
            <div className={inputContainerStyle}>
              <label className={labelStyle}>Country</label>
              <input name="country" className={textFieldStyle} value={profileData.address?.country || ""} onChange={handleAddressChange} required />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function profileAction({ request }) {
  const data = await request.formData();

  const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  };
  try {
    const response = await apiClient.put("/profile", profileData);
    return { success: true, profileData: response.data };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to save profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}