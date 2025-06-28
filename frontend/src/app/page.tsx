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

  const resetForm = () => {
    setUrl("");
    setQrImage(null);
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
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 placeholder:opacity-75 text-gray-900"
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={generateQR}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate QR Code"}
          </button>
          
          <button
            onClick={resetForm}
            className="px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            Reset
          </button>
        </div>

        {qrImage && (
          <div className="text-center">
            <Image
              src={qrImage}
              alt="QR Code"
              width={192}
              height={192}
              className="mx-auto mb-4"
              unoptimized
            />
            <a
              href={qrImage}
              download="qr_code.png"
              className="inline-block w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
