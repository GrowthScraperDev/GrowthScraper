"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactFormPopup({ popup = false,
  onCloseModal, title, subtitle }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyGkR3Q8v9jiSB2QG1byYGdDohd_utTvZzbuMRcSOUt7d9EHdj_jzWSRxLMgBDMFQJPEw/exec";

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("sheetName", "Contact")
      await fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  const handleClick = () => {
    onCloseModal?.();
  };
  if (submitted) {
    return (
      <div className="w-full flex justify-center ">

      <div
        className={`w-[550px] rounded-[28px] px-6 py-6 lg:p-10 bg-white text-center flex justify-center space-y-4 lg:space-y-5 flex-col`}
      >
        <div className="flex justify-center align-middle  text-center">
          <img src="/icon.svg" alt="Success" className="w-16 h-16" />
        </div>
        <div>
        <h2 className="text-2xl font-semibold">Message Sent Successfully</h2>
        <p className="text-gray-500 mt-2">
          Our team will contact you soon.
        </p>
        </div>

        {popup && (
          <button onClick={handleClick} className="primaryBtn">
            <span>{"Back to Home"}</span>
          </button>
        )}
      </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">

      <div
        className={`w-[550px] rounded-[28px] px-6 py-6 lg:p-10 bg-white`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-5"
        >
          <div className="relative">
            {/* Close Button */}
            <span
              type="button"
              onClick={() => onCloseModal?.()}
              className="absolute right-0 top-0  rounded-full hover:bg-gray-100 transition"
            >
              <X size={18} />
            </span>
            <h2 className="text-[22px] lg:text-[26px] font-semibold mb-1">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              placeholder="Your Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\-\s()]{7,15}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Your Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Interested In Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              I am Interested In
            </label>
            <select
              {...register("interest", { required: "Please select an option" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white"
            >
              <option value="">Select an option</option>
              <option value="Solutions">Solutions</option>
              <option value="Academy">Academy</option>
              <option value="Corporate Training">Corporate Training</option>
            </select>

            {errors.interest && (
              <p className="text-red-500 text-xs mt-1">
                {errors.interest.message}
              </p>
            )}
          </div>
          {/* Message */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              How Can We Help You
            </label>
            <input
              {...register("message", { required: "Message required" })}
              placeholder="Tell us what you are looking for"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-900 text-white px-8 py-3 rounded-full hover:bg-green-800 transition"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}