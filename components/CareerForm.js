"use client";

import { useState } from "react";
import { useForm as useHookForm } from "react-hook-form";
import {
  qualificationOptions,
  graduationYears,
  careerBreakGraduationYears,
  studyYears,
  studentGoals,
  graduateGoals,
  workingGoals,
  careerBreakGoals,
  investmentOptions,
  salaryRanges,
} from "@/data/careerFormOptions";
export default function CareerForm({ onCloseModal }) {

  const [step, setStep] = useState("common");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useHookForm();

  /* ---------- STEP VALIDATION ---------- */

  const validateCommon = async (data) => {
    const valid = await trigger(["name", "email", "phone", "profile"]);

    if (!valid) return;

    if (data.profile === "Student") setStep("student");
    if (data.profile === "Graduate") setStep("graduate");
    if (data.profile === "Working Professional") setStep("working");
    if (data.profile === "Career Break") setStep("careerBreak");
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

  return (
    <div className="w-full flex justify-center">

      <div
        className={`w-[520px] rounded-[28px] px-0 py-6 lg:p-10 ${step === "success"
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

        {/* ---------------- COMMON STEP ---------------- */}

        {step === "common" && (
          <form onSubmit={handleSubmit(validateCommon)} className="space-y-5">

            <Header
              title="Lets Get to Know You"
              subtitle="Start by sharing a few basic details so we can guide you better."
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
                <option>Student</option>
                <option>Graduate</option>
                <option>Working Professional</option>
                <option>Career Break</option>
              </select>
            </Field>

            <button className="primaryBtn"><span>Continue</span></button>

          </form>
        )}

        {/* ---------------- STUDENT ---------------- */}

        {step === "student" && (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            <Header
              title="Your Career Starts Here"
              subtitle="Your first smart step toward a strong career."
            />

            <Field label="Which degree are you pursuing?" error={errors.degree}>
              <select {...register("degree", { required: "Degree required" })} className="input">
                <option value="">Select</option>
                {qualificationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Current year of study" error={errors.studyYear}>
              <select {...register("studyYear", { required: "Year required" })} className="input">
                <option value="">Select</option>
                {studyYears.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="What is your main goal?" error={errors.goal}>
              <select {...register("goal", { required: "Goal required" })} className="input">
                <option value="">Select</option>
                {studentGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Are you ready to invest?" error={errors.invest}>
              <select {...register("invest", { required: "Selection required" })} className="input">
                <option value="">Select</option>
                {investmentOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <FormButtons back={() => setStep("common")}   isSubmitting={isSubmitting}/>

          </form>
        )}

        {/* ---------------- GRADUATE ---------------- */}

        {step === "graduate" && (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            <Header
              title="Time to Build Your Career"
              subtitle="Your degree is ready, lets build your career next."
            />

            <Field label="Highest Qualification" error={errors.qualification}>
              <select {...register("qualification")} className="input">
                <option value="">Select</option>

                {qualificationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>
            </Field>

            <Field label="Year of Graduation" error={errors.graduationYear}>
              <select {...register("graduationYear", { required: "Required" })} className="input">
                <option value="">Select</option>
                {graduationYears.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Main Goal" error={errors.goal}>
              <select {...register("goal", { required: "Required" })} className="input">
                <option value="">Select</option>
                {graduateGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Ready to invest?" error={errors.invest}>
              <select {...register("invest", { required: "Required" })} className="input">
                <option value="">Select</option>
                {investmentOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <FormButtons back={() => setStep("common")}   isSubmitting={isSubmitting} />

          </form>
        )}

        {/* ---------------- WORKING ---------------- */}

        {step === "working" && (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            <Header
              title="Plan Your Next Move"
              subtitle="Your next career leap starts with the right skills."
            />

            <Field label="Current Role" error={errors.role}>
              <input
                {...register("role", { required: "Role required" })}
                className="input"
              />
            </Field>

            <Field label="Salary Range" error={errors.salary}>
              <select {...register("salary", { required: "Required" })} className="input">
                <option value="">Select</option>
                {salaryRanges.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Main Goal" error={errors.goal}>
              <select {...register("goal", { required: "Required" })} className="input">
                <option value="">Select</option>
                {workingGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Ready to invest?" error={errors.invest}>
              <select {...register("invest", { required: "Required" })} className="input">
                <option value="">Select</option>
                {investmentOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <FormButtons back={() => setStep("common")}   isSubmitting={isSubmitting}/>

          </form>
        )}

        {/* ---------------- CAREER BREAK ---------------- */}

        {step === "careerBreak" && (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            <Header
              title="Restart with Confidence"
              subtitle="Your break was a pause, not a full stop."
            />

            <Field label="Highest Qualification" error={errors.qualification}>
              <select {...register("qualification", { required: "Required" })} className="input">
                <option value="">Select</option>
                {qualificationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="When did you graduate?" error={errors.graduationYear}>
              <select {...register("graduationYear", { required: "Required" })} className="input">
                <option value="">Select</option>
                {careerBreakGraduationYears.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Main Goal" error={errors.goal}>
              <select {...register("goal", { required: "Required" })} className="input">
                <option value="">Select</option>
                {careerBreakGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Ready to invest?" error={errors.invest}>
              <select {...register("invest", { required: "Required" })} className="input">
                <option value="">Select</option>
                {investmentOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <FormButtons
              back={() => setStep("common")}   isSubmitting={isSubmitting}
            />

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
              Successfully Submitted
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Our executive will reach out to you.
            </p>

            <button
              onClick={() => onCloseModal?.()}
              // onClick={() => setStep("common")}
              className="primaryBtn"
            >
              <span>
                Back to Home
              </span>

            </button>

          </div>
        )}

      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Header({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-[26px] font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
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
    <div className="flex gap-4 pt-4">

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