"use client";

import { toast } from "sonner";

export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this intern?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/interns/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Intern deleted successfully");

      window.location.reload();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}