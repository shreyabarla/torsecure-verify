"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddInternPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    designation: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/interns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add intern");
        return;
      }

      toast.success("Intern added successfully!");

      router.push("/admin/interns");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">
        Add New Intern
      </h1>

      <p className="text-gray-500 mb-8">
        Enter the intern details below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* College */}
          <div>
            <label className="block mb-2 font-medium">
              College
            </label>

            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-2 font-medium">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Add Intern
          </button>
        </div>
      </form>
    </div>
  );
}