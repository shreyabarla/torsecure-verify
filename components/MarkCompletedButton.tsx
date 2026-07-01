"use client";

import { toast } from "sonner";

export default function MarkCompletedButton({
  internId,
}: {
  internId: number;
}) {
  const handleComplete = async () => {
    const confirmed = window.confirm(
      "Mark this internship as completed?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/interns/${internId}/complete`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    window.location.reload();
  };

  return (
    <button
      onClick={handleComplete}
      className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
    >
      Mark as Completed
    </button>
  );
}