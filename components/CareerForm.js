"use client";

import { useState } from "react";
import { useForm as useHookForm } from "react-hook-form";
import {
  mainGoals,
  startTimelines,
  investmentReadiness,
} from "@/data/careerFormOptions";
import { X } from "lucide-react";
export default function CareerForm({ onCloseModal,successHeading,successSubHeading,btnTxt,fileUrl,download }) {

  const [step, setStep] = useState("common");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useHookForm();

  /* ---------- STEP VALIDATION ---------- */

  const validateCommon = async () => {
    const valid = await trigger(["name", "email", "phone", "profile"]);

    if (!valid) return;

    setStep("goals");
  };
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyGkR3Q8v9jiSB2QG1byYGdDohd_utTvZzbuMRcSOUt7d9EHdj_jzWSRxLMgBDMFQJPEw/exec";

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("sheetName", "Enrollment")
      await fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStep("success");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDownload = (url) => {
    if (!url) return;

    // Extract filename from URL
    const fileName = url.split("/").pop();

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleClick = () => {
    if (download && fileUrl) {
      handleDownload(fileUrl);
    }

    onCloseModal?.();
  };
  return (
    <div className="w-full flex justify-center">

      <div
        className={`w-[550px] rounded-[28px] px-6 py-6 lg:p-10 ${step === "success"
          ? "bg-cover bg-center text-white"
          : "bg-white"
          }`}
        style={
          step === "success"
            ? {
              backgroundImage:
                "url('/Thanks.png')" // your image path
            }
            : {}
        }
      >

        {/* ---------------- FLOW 1: GET TO KNOW YOU ---------------- */}

        {step === "common" && (
          <form onSubmit={handleSubmit(validateCommon)} className="space-y-4 lg:space-y-5">

            <Header
              title="Let's Get to Know You"
              subtitle="Tell us a little about yourself so we can guide you better."
              onCloseModal={onCloseModal}
            />

            <Field label="Full Name" error={errors.name}>
              <input
                {...register("name", { required: "Full name is required" })}
                className="input"
              />
            </Field>

            <Field label="Email Address" error={errors.email}>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email"
                  }
                })}
                className="input"
              />
            </Field>

            <Field label="Phone Number" error={errors.phone}>
              <input
                {...register("phone", {
                  required: "Phone number required",
                  minLength: {
                    value: 10,
                    message: "Invalid phone number"
                  }
                })}
                className="input"
              />
            </Field>

            <Field label="Your Profile" error={errors.profile}>
              <select
                {...register("profile", { required: "Select profile" })}
                className="input"
              >
                <option value="">Select</option>
                <option>Student / Graduate</option>
                <option>Working Professional</option>
                <option>Career Break</option>
                <option>Business Owner</option>
              </select>
            </Field>

            <button className="primaryBtn"><span>Continue &rarr;</span></button>

          </form>
        )}

        {/* ---------------- FLOW 2: WHAT YOU'RE LOOKING FOR ---------------- */}

        {step === "goals" && (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 lg:space-y-5">

            <Header
              title="Tell Us What You're Looking For"
              subtitle="Help us understand your goals and how soon you'd like to get started."
              onCloseModal={onCloseModal}
            />

            <Field label="What is your main goal?" error={errors.goal}>
              <select {...register("goal", { required: "Goal required" })} className="input">
                <option value="">Select</option>
                {mainGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="When are you planning to start?" error={errors.timeline}>
              <select {...register("timeline", { required: "Timeline required" })} className="input">
                <option value="">Select</option>
                {startTimelines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Are you comfortable investing in the program?" error={errors.invest}>
              <select {...register("invest", { required: "Selection required" })} className="input">
                <option value="">Select</option>
                {investmentReadiness.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <FormButtons back={() => setStep("common")} isSubmitting={isSubmitting} />

          </form>
        )}

        {/* ---------------- SUCCESS ---------------- */}

        {step === "success" && (
          <div className="text-center py-6">

            <div className="flex justify-center mb-6">
              <img
                src="/icon.svg"
                alt="Success"
                className="w-20 h-20"
              />
            </div>

            <h2 className="text-2xl font-medium text-[#0C0C0C]">
              {successHeading ? successHeading : "Successfully Submitted"}
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              {successSubHeading ? successSubHeading : "Our executive will reach out to you."}
            </p>

            <button
              onClick={handleClick}
              // onClick={() => setStep("common")}
              className="primaryBtn"
            >
              <span>
               {btnTxt ? btnTxt: "Back to Home"}
              </span>

            </button>

          </div>
        )}

      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Header({ title, subtitle,onCloseModal }) {
  return (
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
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

function FormButtons({ back ,isSubmitting}) {
  return (
    <div className="flex gap-4">

      <button
        type="button"
        onClick={back} disabled={isSubmitting}
        className="w-full border border-gray-300 rounded-full py-3"
      >
        <span className="text-[#084734]">Back</span>
      </button>

      <button
        type="submit" disabled={isSubmitting}
        className="w-full bg-green-900 text-white rounded-full py-3 disabled:opacity-50"
      >
        <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
      </button>

    </div>
  );
}
