"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function GenerateCertificateButton({
    
  internId,
}: {
  internId: number;
}) {
    const router = useRouter();
  const handleGenerate = async () => {
    const confirmed = window.confirm(
      "Generate certificate for this intern?"
    );

    if (!confirmed) return;

    const response = await fetch("/api/certificates/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        internId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    toast.success(data.message);

    router.push(`/certificates/${data.data.certificateId}`);
  };

  return (
    <button
      onClick={handleGenerate}
      className="rounded-lg bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
    >
      Generate Certificate
    </button>
  );
}