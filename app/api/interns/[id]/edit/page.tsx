"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditInternPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    designation: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchIntern() {
      try {
        const res = await fetch(`/api/interns/${id}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        setFormData({
          fullName: data.data.fullName,
          email: data.data.email,
          phone: data.data.phone,
          college: data.data.college,
          designation: data.data.designation,
          startDate: data.data.startDate.slice(0, 10),
          endDate: data.data.endDate.slice(0, 10),
        });
      } catch {
        toast.error("Failed to load intern");
      } finally {
        setLoading(false);
      }
    }

    fetchIntern();
  }, [id]);

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

    const res = await fetch(`/api/interns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Intern updated successfully");

    router.push("/admin/interns");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        Edit Intern
      </h1>

      <p className="text-gray-500 mb-8">
        Update intern details.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg p-3"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="border rounded-lg p-3"
          />

          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            type="button"
            onClick={() => router.back()}
            className="border px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Update Intern
          </button>

        </div>
      </form>

    </div>
  );
}