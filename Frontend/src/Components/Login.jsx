import React, { useEffect, useState } from 'react'
import PageTitle from './PageTitle';
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

const Login = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const from = sessionStorage.getItem("redirectPath") || "/home";

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      loginSuccess(actionData.jwtToken, actionData.user);
      sessionStorage.removeItem("redirectPath");
      navigate(from);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData]);

  // Premium, standard-case typography hierarchy matching the register view
  const labelStyle =
    "block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 tracking-normal";
  
  const textFieldStyle =
    "w-full pl-4 pr-12 py-3 text-[15px] border rounded-xl bg-lighter/5 dark:bg-darkbg/10 border-light/70 dark:border-gray-700 text-gray-900 dark:text-lighter placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary dark:focus:border-light focus:ring-4 focus:ring-primary/5 dark:focus:ring-light/5 transition-all duration-200 font-medium";

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-6 py-12 bg-normalbg dark:bg-darkbg transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Reduced vertical padding here (py-8) */}
        <div className="relative bg-white dark:bg-gray-800 border border-light/40 dark:border-gray-700 shadow-2xl rounded-[1.5rem] px-8 py-8 md:px-10 transition-all duration-300">
          
          {/* Tightened header margin */}
          <div className="mb-6 text-center">
            <PageTitle title="Welcome Back" />
            <p className="text-xs font-medium tracking-wide text-gray-500 dark:text-lighter/50 mt-1.5">
              Sign in to Stickora
            </p>
          </div>

          {/* Tightened space-y-4 between input groups */}
          <Form method="POST" className="space-y-4">
            <div>
              <label htmlFor="username" className={labelStyle}>
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                required
                className={textFieldStyle}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  minLength={4}
                  maxLength={20}
                  className={textFieldStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-light transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  {/* ... Keep your SVG icons here ... */}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 text-[15px] font-bold text-white dark:text-darkbg bg-primary dark:bg-light hover:bg-opacity-95 rounded-xl transition-all duration-200 shadow-md active:scale-[0.995] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide"
              >
                {isSubmitting ? "Authenticating..." : "Login to Dashboard"}
              </button>
            </div>
          </Form>

          {/* Tightened footer placement */}
          <div className="mt-6 pt-5 border-t border-light/40 dark:border-gray-700/60 text-center">
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary dark:text-light hover:underline ml-1 font-bold">
                Register Here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}


export default Login;

export async function loginAction({ request }) {
  const data = await request.formData();
  const loginData = { username: data.get("username"), password: data.get("password") };
  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, errors: { message: "Invalid username or password" } };
    }
    throw new Response(
      error.response?.data?.message || error.message || "Failed to login.",
      { status: error.response?.status || 500 }
    );
  }
}