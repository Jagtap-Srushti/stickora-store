import React from "react";
import PageTitle from "./PageTitle";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPaperPlane, 
  faSpinner, 
  faEnvelope, 
  faMapMarkerAlt, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    submit(formData, { method: "post" });
  };

  // Enforced standard font stack directly onto the form fields and text area elements
  const labelStyle = "block text-xs font-bold text-primary dark:text-light/90 mb-1.5 uppercase tracking-wider font-sans";

  const textFieldStyle =
    "w-full px-4 py-3 text-sm border rounded-xl transition-all duration-300 font-sans " +
    "border-light/70 dark:border-border-dark bg-white dark:bg-gray-800 " +
    "text-gray-800 dark:text-lighter placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:outline-none focus:border-primary dark:focus:border-light " +
    "focus:ring-4 focus:ring-primary/10 dark:focus:ring-light/10 shadow-sm";
    
  return (
    // Replaced py-12 with pt-12 pb-24 to fix the bottom whitespace truncation
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 pt-12 pb-24 font-primary bg-normalbg dark:bg-darkbg transition-colors duration-300">
      
      {/* Page Title Block */}
      <div className="text-center mb-4">
        <PageTitle title="Contact Us" />
      </div>

      <p className="max-w-[580px] mx-auto text-sm font-medium text-gray-500 dark:text-lighter/60 mb-12 text-center leading-relaxed font-sans">
        We’d love to hear from you! If you have any questions, feedback, or
        suggestions, please don’t hesitate to reach out.
      </p>

      {/* Two-Column Dashboard Content Wrapper - items-stretch aligns column heights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[1024px] mx-auto">
        
        {/* Left Side: Modern Visual Info Cards (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Support Email Card */}
          <div className="flex-1 p-6 rounded-2xl bg-cardbg-light dark:bg-cardbg-dark border border-light/40 dark:border-border-dark shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-light/10 flex items-center justify-center text-primary dark:text-light shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-light mb-1 font-sans">Email Us</h4>
              <p className="text-sm font-semibold text-gray-700 dark:text-lighter font-sans">support@stickora.com</p>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">Online helpdesk ticket desk</span>
            </div>
          </div>

          {/* Location Card */}
          <div className="flex-1 p-6 rounded-2xl bg-cardbg-light dark:bg-cardbg-dark border border-light/40 dark:border-border-dark shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-light/10 flex items-center justify-center text-primary dark:text-light shrink-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-light mb-1 font-sans">Headquarters</h4>
              <p className="text-sm font-semibold text-gray-700 dark:text-lighter font-sans">Pune, Maharashtra</p>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">India Operations Hub</span>
            </div>
          </div>

          {/* Hours Card */}
          <div className="flex-1 p-6 rounded-2xl bg-cardbg-light dark:bg-cardbg-dark border border-light/40 dark:border-border-dark shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-light/10 flex items-center justify-center text-primary dark:text-light shrink-0">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-light mb-1 font-sans">Working Hours</h4>
              <p className="text-sm font-semibold text-gray-700 dark:text-lighter font-sans">Mon - Sat: 9 AM - 6 PM</p>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">Standard IST response times</span>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Structured Form Module (8 Columns) */}
        <div className="lg:col-span-8 bg-cardbg-light dark:bg-cardbg-dark border border-light/40 dark:border-border-dark rounded-2xl p-6 sm:p-10 shadow-premium">
          <Form
            method="POST"
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name" className={labelStyle}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className={textFieldStyle}
                required
                minLength={5}
                maxLength={30}
              />
              {actionData?.errors?.name && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold font-sans">
                  {actionData.errors.name}
                </p>
              )}
            </div>

            {/* Email and Mobile Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={textFieldStyle}
                  required
                />
                {actionData?.errors?.email && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold font-sans">
                    {actionData.errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div>
                <label htmlFor="mobileNumber" className={labelStyle}>
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  required
                  pattern="^\d{10}$"
                  title="Mobile number must be exactly 10 digits"
                  placeholder="10-digit mobile number"
                  className={textFieldStyle}
                />
                {actionData?.errors?.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold font-sans">
                    {actionData.errors.mobileNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className={labelStyle}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Describe your request in detail..."
                className={`${textFieldStyle} resize-none`}
                required
                minLength={5}
                maxLength={500}
              ></textarea>
              {actionData?.errors?.message && (
                <p className="text-red-500 text-xs mt-1.5 font-semibold font-sans">
                  {actionData.errors.message}
                </p>
              )}
            </div>

            {/* Form Action Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white dark:text-black text-sm font-bold tracking-wider rounded-xl transition-all duration-300 bg-primary hover:bg-primary/90 dark:bg-light dark:hover:bg-lighter disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/10 active:scale-[0.99] cursor-pointer font-sans"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        </div>

      </div>
    </div>
  );
}

// Keep contactAction backend routing logic untouched as requested
export async function contactAction({ request }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };
  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
      error.message ||
      "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}