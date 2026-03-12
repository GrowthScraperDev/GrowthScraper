"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxkglQcwk8MSlb3-cPOyev2yDTwGl_FDR7bd6QsUxnCNGhXsBG_CfYRZPbbDHwiRzs0gA/exec";

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

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

  if (submitted) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Message Sent Successfully</h2>
        <p className="text-gray-500 mt-2">
          Our team will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-8"
      >

        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="John Deo"
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
            placeholder="john.deo@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Subject
          </label>
          <input
            {...register("subject", { required: "Subject required" })}
            placeholder="SEO Support"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">
              {errors.subject.message}
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
            placeholder="Get expert SEO support to enhance your website's visibility and drive traffic!"
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
            className="bg-green-900 text-white px-8 py-3 rounded-full hover:bg-green-800 transition"
          >
            Send Message
          </button>
        </div>

      </form>
    </div>
  );
}