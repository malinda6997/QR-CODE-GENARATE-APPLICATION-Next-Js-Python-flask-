"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setQrImage(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/generate",
        { text: url },
        { responseType: "blob" }
      );

      const imageURL = URL.createObjectURL(res.data);
      setQrImage(imageURL);
    } catch (error) {
      console.error("QR generation error:", error);
      alert("QR generation failed. Is backend running?");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          QR Code Generator
        </h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateQR}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>

        {qrImage && (
          <div className="text-center mt-6">
            <Image
              src={qrImage}
              alt="QR Code"
              width={192}
              height={192}
              className="mx-auto mb-2"
              unoptimized
            />
            <a
              href={qrImage}
              download="qr_code.png"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
