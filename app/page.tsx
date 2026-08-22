"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Your Vision Dream AI video request has been received!");
    }, 1500);
  };

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Vision Dream AI</h1>

      <p>AI-powered video generator</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video..."
        rows={6}
        style={{ width: "100%", padding: "15px" }}
      />

      <button
        onClick={generateVideo}
        disabled={loading}
        style={{ marginTop: "15px", padding: "12px 24px" }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>
    </main>
  );
}
