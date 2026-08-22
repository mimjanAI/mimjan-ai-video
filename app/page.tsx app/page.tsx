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
      alert("Your Vision Dream AI video request is ready!");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-12 text-center">
          <div className="mb-4 text-5xl">✦</div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Vision Dream AI
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Turn your imagination into stunning AI videos.
          </p>
        </header>

        <section className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
          <label className="mb-3 block text-lg font-semibold">
            Describe your dream video
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A futuristic city at night, flying cars, cinematic lighting..."
            className="min-h-40 w-full resize-none rounded-2xl border border-gray-700 bg-black p-5 text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() =>
                setPrompt(
                  "A cinematic futuristic city at night with flying cars and beautiful neon lights"
                )
              }
              className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
            >
              ✨ Cinematic
            </button>

            <button
              onClick={() =>
                setPrompt(
                  "A magical dream world with glowing flowers, mountains and a beautiful sunset"
                )
              }
              className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
            >
              🌌 Dream World
            </button>

            <button
              onClick={() =>
                setPrompt(
                  "A realistic ocean scene with giant waves, dramatic clouds and cinematic camera movement"
                )
              }
              className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
            >
              🌊 Realistic
            </button>
          </div>

          <button
            onClick={generateVideo}
            disabled={loading || !prompt.trim()}
            className="mt-7 w-full rounded-2xl bg-purple-600 px-6 py-4 text-lg font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Creating your dream..." : "🎬 Generate Video"}
          </button>
        </section>

        <section className="mt-10 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="text-3xl">🧠</div>
            <h2 className="mt-4 text-xl font-semibold">AI Creation</h2>
            <p className="mt-2 text-sm text-gray-400">
              Describe your idea and turn it into a visual concept.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="text-3xl">🎥</div>
            <h2 className="mt-4 text-xl font-semibold">Video Generator</h2>
            <p className="mt-2 text-sm text-gray-400">
              Create cinematic video experiences from simple prompts.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="text-3xl">✨</div>
            <h2 className="mt-4 text-xl font-semibold">Dream Studio</h2>
            <p className="mt-2 text-sm text-gray-400">
              Build, experiment and bring your imagination to life.
            </p>
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-gray-600">
          © 2026 Vision Dream AI
        </footer>
      </div>
    </main>
  );
}
