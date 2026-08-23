"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const generateVideo = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create video.");
      }

      if (!data?.id) {
        throw new Error("No prediction ID was returned.");
      }

      const predictionId = data.id;

      pollingRef.current = setInterval(async () => {
        try {
          const statusResponse = await fetch(
            `/api/predictions?id=${predictionId}`,
            {
              cache: "no-store",
            }
          );

          const statusData = await statusResponse.json();

          if (!statusResponse.ok) {
            throw new Error(
              statusData?.error || "Failed to check video status."
            );
          }

          if (statusData.status === "succeeded") {
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }

            const output = statusData.output;

            const url =
              typeof output === "string"
                ? output
                : Array.isArray(output)
                ? output[0]
                : "";

            if (!url) {
              throw new Error("Video was generated but no video URL was found.");
            }

            setVideoUrl(url);
            setLoading(false);
          }

          if (
            statusData.status === "failed" ||
            statusData.status === "canceled"
          ) {
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }

            setLoading(false);
            setError(
              statusData.error ||
                "Video generation failed. Please try another prompt."
            );
          }
        } catch (pollError) {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }

          setLoading(false);
          setError(
            pollError instanceof Error
              ? pollError.message
              : "Something went wrong."
          );
        }
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f7f7f8",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "36px",
          }}
        >
          Vision Dream AI
        </h1>

        <p
          style={{
            marginBottom: "24px",
            color: "#666",
            fontSize: "18px",
          }}
        >
          AI-powered video generator
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your video..."
          rows={7}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={generateVideo}
          disabled={loading || !prompt.trim()}
          style={{
            marginTop: "16px",
            padding: "14px 28px",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#999" : "#111",
            color: "#fff",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating Video..." : "Generate Video"}
        </button>

        {loading && (
          <p
            style={{
              marginTop: "20px",
              color: "#555",
            }}
          >
            Your video is being generated. Please wait...
          </p>
        )}

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "8px",
              background: "#ffecec",
              color: "#b00020",
            }}
          >
            {error}
          </div>
        )}

        {videoUrl && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ marginBottom: "15px" }}>Your Video</h2>

            <video
              src={videoUrl}
              controls
              style={{
                width: "100%",
                borderRadius: "12px",
                display: "block",
              }}
            />

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "15px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Open Video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
