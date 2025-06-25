"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AskQuotePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy: pretend to send to server
    console.log({ name, email, date, details });
    setSubmitted(true);
    setTimeout(() => router.push("/artists"), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Request Sent!</h1>
          <p>Thank you, {name}. We&rsquo;ll get back to you soon.</p>
          <p className="mt-2 text-sm text-gray-500">Redirecting to artists list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Ask for Quote</h1>

        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1">Your Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1">Your Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1">Event Date</span>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium mb-1">Event Details</span>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-3 py-2 border rounded h-24"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 hover:cursor-pointer"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
