"use client";

export const dynamic = "force-dynamic";

import { useMemo, useRef, useState } from "react";

type OutputFile = {
  name: string;
  url: string;
  size: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertHeicFile(file: File, quality: number): Promise<OutputFile> {
  // ✅ dynamic import (fixes window error)
  const heicModule = await import("heic2any");
  const heic2any = heicModule.default;

  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality,
  });

  const blob = Array.isArray(converted) ? converted[0] : converted;

  if (!(blob instanceof Blob)) {
    throw new Error(`Could not convert file: ${file.name}`);
  }

  const baseName = file.name.replace(/\.[^.]+$/i, "");
  const outputName = `${baseName}.jpg`;

  return {
    name: outputName,
    url: URL.createObjectURL(blob),
    size: blob.size,
  };
}

export default function HeicToJpgPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number>(0.9);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<OutputFile[]>([]);

  const selectedCountText = useMemo(() => {
    if (files.length === 0) return "No files selected yet";
    if (files.length === 1) return "1 HEIC image selected";
    return `${files.length} HEIC images selected`;
  }, [files.length]);

  function clearOldResults() {
    results.forEach((item) => URL.revokeObjectURL(item.url));
    setResults([]);
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;

    clearOldResults();
    setError("");

    const accepted = Array.from(list).filter((file) => {
      const lower = file.name.toLowerCase();
      return (
        lower.endsWith(".heic") ||
        file.type === "image/heic" ||
        file.type === "image/heif"
      );
    });

    if (accepted.length === 0) {
      setFiles([]);
      setError("Please choose HEIC files.");
      return;
    }

    setFiles(accepted);
  }

  async function runConversion() {
    if (files.length === 0) {
      setError("Add at least one HEIC image first.");
      return;
    }

    setLoading(true);
    setError("");
    clearOldResults();

    try {
      const output: OutputFile[] = [];

      for (const file of files) {
        const converted = await convertHeicFile(file, quality);
        output.push(converted);
      }

      setResults(output);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while converting."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadFile(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <h1>HEIC to JPG</h1>
          <p>
            Convert iPhone HEIC photos into JPG files directly in your browser so
            websites and forms accept them.
          </p>
        </div>

        <div
          className="upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
        >
          <strong>Drag and drop HEIC images here</strong>
          <p>or click to browse for .heic files</p>
          <span className="upload-meta">{selectedCountText}</span>

          <input
            ref={inputRef}
            type="file"
            accept=".heic,image/heic,image/heif"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="tool-controls">
          <div className="form-row">
            <label htmlFor="quality">JPG quality</label>
            <input
              id="quality"
              type="range"
              min="0.5"
              max="1"
              step="0.01"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
          </div>

          <div className="form-row">
            <label>Selected quality</label>
            <input value={`${Math.round(quality * 100)}%`} readOnly />
          </div>
        </div>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={runConversion}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert to JPG"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Results</h2>
          <p>Download each converted JPG after processing completes.</p>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            Your converted JPG files will appear here.
          </div>
        ) : (
          <div className="results-list">
            {results.map((item) => (
              <div key={item.url} className="result-card">
                <div>
                  <h3>{item.name}</h3>
                  <p>{formatBytes(item.size)}</p>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => downloadFile(item.url, item.name)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
