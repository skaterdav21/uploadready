"use client";

import { useMemo, useRef, useState } from "react";

type OutputFile = {
  name: string;
  url: string;
  size: number;
  originalSize: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read image: ${file.name}`));
    };
    img.src = url;
  });
}

async function compressSingleImage(file: File, quality: number): Promise<OutputFile> {
  const img = await loadImage(file);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not create canvas context.");
  }

  ctx.drawImage(img, 0, 0);

  const lower = file.name.toLowerCase();
  const outputType =
    lower.endsWith(".png") || file.type === "image/png" ? "image/png" : "image/jpeg";

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, outputType, outputType === "image/png" ? undefined : quality)
  );

  if (!blob) {
    throw new Error(`Could not compress image: ${file.name}`);
  }

  const extension = outputType === "image/png" ? "png" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const outputName = `${baseName}-compressed.${extension}`;

  return {
    name: outputName,
    url: URL.createObjectURL(blob),
    size: blob.size,
    originalSize: file.size,
  };
}

export default function CompressImagePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number>(0.72);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<OutputFile[]>([]);

  const selectedCountText = useMemo(() => {
    if (files.length === 0) return "No files selected yet";
    if (files.length === 1) return "1 image selected";
    return `${files.length} images selected`;
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
        file.type.startsWith("image/") ||
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".png") ||
        lower.endsWith(".webp")
      );
    });

    if (accepted.length === 0) {
      setFiles([]);
      setError("Please choose JPG, JPEG, PNG, or WebP files.");
      return;
    }

    setFiles(accepted);
  }

  async function runCompression() {
    if (files.length === 0) {
      setError("Add at least one image first.");
      return;
    }

    setLoading(true);
    setError("");
    clearOldResults();

    try {
      const output: OutputFile[] = [];
      for (const file of files) {
        const compressed = await compressSingleImage(file, quality);
        output.push(compressed);
      }
      setResults(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while compressing.");
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
          <h1>Compress Image</h1>
          <p>
            Reduce image file size in your browser so uploads stop failing. Great for
            email attachments, form portals, and websites with size limits.
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
          <strong>Drag and drop images here</strong>
          <p>or click to browse for JPG, PNG, or WebP files</p>
          <span className="upload-meta">{selectedCountText}</span>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="tool-controls">
          <div className="form-row">
            <label htmlFor="quality">Quality</label>
            <input
              id="quality"
              type="range"
              min="0.3"
              max="0.95"
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
          <button type="button" className="btn btn-primary" onClick={runCompression} disabled={loading}>
            {loading ? "Compressing..." : "Compress images"}
          </button>
        </div>

        {error ? <div className="error-box">{error}</div> : null}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Results</h2>
          <p>Download each compressed image after processing completes.</p>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">Your compressed images will appear here.</div>
        ) : (
          <div className="results-list">
            {results.map((item) => {
              const saved = item.originalSize - item.size;
              const percent =
                item.originalSize > 0
                  ? Math.max(0, Math.round((saved / item.originalSize) * 100))
                  : 0;

              return (
                <div key={item.url} className="result-card">
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      Before: {formatBytes(item.originalSize)} • After: {formatBytes(item.size)} • Saved: {percent}%
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => downloadFile(item.url, item.name)}
                  >
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Related tools</h2>
          <p>Use these together when you need cleaner upload-ready files.</p>
        </div>

        <div className="card-grid">
          <a className="tool-card" href="/resize-image">
            <div className="tool-card-top">
              <h3>Resize Image</h3>
              <span>Ready</span>
            </div>
            <p>Shrink dimensions before or after compression.</p>
          </a>

          <a className="tool-card" href="/heic-to-jpg">
            <div className="tool-card-top">
              <h3>HEIC to JPG</h3>
              <span>Coming next</span>
            </div>
            <p>Convert iPhone photos into a more compatible format.</p>
          </a>

          <a className="tool-card" href="/compress-pdf">
            <div className="tool-card-top">
              <h3>Compress PDF</h3>
              <span>Later</span>
            </div>
            <p>Reduce document size for upload limits.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
