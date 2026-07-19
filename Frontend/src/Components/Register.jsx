import React, { useRef, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login..");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");
    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Upgraded typography and padding definitions for a premium, clean aesthetic
  const labelStyle =
    "block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 tracking-normal";
  
  const textFieldStyle =
    "w-full px-4 py-3 text-[15px] border rounded-xl bg-lighter/5 dark:bg-darkbg/10 border-light/70 dark:border-gray-700 text-gray-900 dark:text-lighter placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary dark:focus:border-light focus:ring-4 focus:ring-primary/5 dark:focus:ring-light/5 transition-all duration-200 font-medium";

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-6 py-12 bg-normalbg dark:bg-darkbg transition-colors duration-300 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[128px]" />
      </div>

      {/* Kept max-w-lg to support side-by-side grouped fields perfectly */}
      <div className="relative z-10 max-w-lg w-full">
        {/* Shrunk vertical padding to py-8 */}
        <div className="relative bg-white dark:bg-gray-800 border border-light/40 dark:border-gray-700 shadow-2xl rounded-[1.5rem] px-8 py-8 md:px-10 transition-all duration-300">
          
          <div className="mb-6 text-center">
            <PageTitle title="Register" />
            <p className="text-xs font-medium tracking-wide text-gray-500 dark:text-lighter/50 mt-1.5">
              Create your Stickora account
            </p>
          </div>

          <Form method="POST" ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Full Name */}
            <div>
              <label htmlFor="name" className={labelStyle}>Full Name</label>
              <input id="name" type="text" name="name" placeholder="Enter your full name" required minLength={5} maxLength={30} className={textFieldStyle} />
              {actionData?.errors?.name && <p className="text-red-500 text-xs mt-1 font-medium">{actionData.errors.name}</p>}
            </div>

            {/* Row 2: Shared Grid for Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelStyle}>Email Address</label>
                <input id="email" type="email" name="email" placeholder="Email address" autoComplete="email" required className={textFieldStyle} />
                {actionData?.errors?.email && <p className="text-red-500 text-xs mt-1 font-medium">{actionData.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="mobileNumber" className={labelStyle}>Mobile Number</label>
                <input id="mobileNumber" type="tel" name="mobileNumber" placeholder="10-digit number" required pattern="^\d{10}$" className={textFieldStyle} />
                {actionData?.errors?.mobileNumber && <p className="text-red-500 text-xs mt-1 font-medium">{actionData.errors.mobileNumber}</p>}
              </div>
            </div>

            {/* Row 3: Shared Grid for Security Keys */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className={labelStyle}>Password</label>
                <input id="password" type="password" name="password" placeholder="Create password" required autoComplete="new-password" minLength={8} maxLength={20} className={textFieldStyle} />
                {actionData?.errors?.password && <p className="text-red-500 text-xs mt-1 font-medium">{actionData.errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPwd" className={labelStyle}>Confirm Password</label>
                <input id="confirmPwd" type="password" name="confirmPwd" placeholder="Repeat password" required autoComplete="confirm-password" minLength={8} maxLength={20} className={textFieldStyle} />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 text-[15px] font-bold text-white dark:text-darkbg bg-primary dark:bg-light hover:bg-opacity-95 rounded-xl transition-all duration-200 shadow-md active:scale-[0.995] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </Form>

          <div className="mt-6 pt-5 border-t border-light/40 dark:border-gray-700/60 text-center">
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary dark:text-light hover:underline ml-1 font-bold">
                Login Here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}


export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage || error.message || "Failed to submit registration.",
      { status: error.status || 500 }
    );
  }
}