"use client";
import { useState } from "react";
import { trackFormSubmit } from "@/lib/gtm";

type LeadMagnetProps = {
  title: string;
  description: string;
  downloadUrl: string;
  magnetType: string;
};

export default function LeadMagnetForm({ title, description, downloadUrl, magnetType }: LeadMagnetProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    trackFormSubmit(`lead_magnet_${magnetType}`);

    const submitData = new FormData();
    submitData.append('email', email);
    submitData.append('lead_magnet', magnetType);
    submitData.append('_captcha', 'false');
    submitData.append('_next', downloadUrl);
    submitData.append('_subject', `Lead Magnet Download: ${title}`);

    try {
      await fetch('https://formsubmit.co/sales@thekpsgroup.com', {
        method: 'POST',
        body: submitData
      });
      setIsSubmitted(true);
      // Trigger download
      window.open(downloadUrl, '_blank');
    } catch {
      alert('Please try again');
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
        <h3 className="font-semibold text-green-800">Download Started!</h3>
        <p className="text-sm text-green-700 mt-1">Check your downloads folder. We&apos;ll also email you a copy.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-kpsNavy/40"
          required
        />
        <button
          type="submit"
          className="bg-kpsNavy text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-95"
        >
          Download
        </button>
      </form>
    </div>
  );
}
