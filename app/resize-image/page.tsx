"use client";

export const metadata = {
  title: "Resize Image for Upload — Fix Size Issues Fast",
  description:
    "Resize images for job applications, forms, and websites. Reduce dimensions and make files upload-ready instantly.",
};

import { useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import LoadingOverlay from "../../components/LoadingOverlay";

type OutputFile = {
  name: string;
  url: string;
  width: number;
  height: number;
  size: number;
};

const presets = [
  { label: "Email ready", width: 1200, height: 1200 },
  { label: "Web ready", width: 1600, height: 1600 },
  { label: "Form upload ready", width: 1000, height: 1000 },
];

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

async function resizeSingleImage(
  file: File,
  maxWidth?: number,
  maxHeight?: number,
  preserveAspect = true
): Promise<OutputFile> {
  const img = await loadImage(file);

  let targetWidth = maxWidth || img.width;
  let targetHeight = maxHeight || img.height;

  if (preserveAspect) {
    const widthRatio = maxWidth ? maxWidth / img.width : Number.POSITIVE_INFINITY;
    const heightRatio = maxHeight ? maxHeight / img.height : Number.POSITIVE_INFINITY;
    const ratio = Math.min(widthRatio, heightRatio, 1);

    targetWidth = Math.round(img.width * ratio);
    targetHeight = Math.round(img.height * ratio);
  } else {
    targetWidth = maxWidth || img.width;
    targetHeight = maxHeight || img.height;
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not create canvas context.");
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const originalType = file.type || "image/jpeg";
  const outputType =
    originalType === "image/png"
      ? "image/png"
      : originalType === "image/webp"
        ? "image/webp"
        : "image/jpeg";

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, outputType, outputType === "image/png" ? undefined : 0.92)
  );

  if (!blob) {
    throw new Error(`Could not resize image: ${file.name}`);
  }

  const extension =
    outputType === "image/png" ? "png" : outputType === "image/webp" ? "webp" : "jpg";

  const baseName = file.name.replace(/\.[^.]+$/, "");
  const outputName = `${baseName}-${targetWidth}x${targetHeight}.${extension}`;

  return {
    name: outputName,
    url: URL.createObjectURL(blob),
    width: targetWidth,
    height: targetHeight,
    size: blob.size,
  };
}

async function downloadAllAsZip(results: OutputFile[], zipName: string) {
  const zip = new JSZip();

  for (const item of results) {
    const response = await fetch(item.url);
    const blob = await response.blob();
    zip.file(item.name, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = zipName;
  a.click();
}

export default function ResizeImagePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [width, setWidth] = useState<string>("1200");
  const [height, setHeight] = useState<string>("");
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
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

  function clearPreviewUrls() {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls([]);
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;

    clearOldResults();
    clearPreviewUrls();
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
    setPreviewUrls(accepted.map((file) => URL.createObjectURL(file)));
  }

  async function runResize() {
    if (files.length === 0) {
      setError("Add at least one image first.");
      return;
    }

    const parsedWidth = width ? Number(width) : undefined;
    const parsedHeight = height ? Number(height) : undefined;

    if (!parsedWidth && !parsedHeight) {
      setError("Enter a width, a height, or both.");
      return;
    }

    if ((parsedWidth && parsedWidth <= 0) || (parsedHeight && parsedHeight <= 0)) {
      setError("Width and height must be greater than 0.");
      return;
    }

    setLoading(true);
    setError("");
    clearOldResults();

    try {
      const output: OutputFile[] = [];
      for (const file of files) {
        const resized = await resizeSingleImage(file, parsedWidth, parsedHeight, preserveAspect);
        output.push(resized);
      }
      setResults(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while resizing.");
    } finally {
      setLoading(false);
    }
  }

  function applyPreset(preset: { width: number; height: number }) {
    setWidth(String(preset.width));
    setHeight(String(preset.height));
    setPreserveAspect(true);
  }

  function downloadFile(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  async function handleZipDownload() {
    try {
      setZipLoading(true);
      await downloadAllAsZip(results, "uploadready-resized-images.zip");
    } finally {
      setZipLoading(false);
    }
  }

  return (
    <main className="page">
      {loading && <LoadingOverlay text="Resizing images..." />}
      {zipLoading && <LoadingOverlay text="Creating ZIP download..." />}

      <section className="section">
        <div className="section-head">
          <h1>Resize Image</h1>
          <p>
            Resize JPG, PNG, and WebP images right in your browser. Great for forms,
            websites, email attachments, and portals with upload limits.
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

        {previewUrls.length > 0 && (
          <div className="preview-grid">
            {previewUrls.map((url, i) => (
              <img key={i} src={url} alt="preview" className="preview-img" />
            ))}
          </div>
        )}

        <div className="tool-controls">
          <div className="form-row">
            <label htmlFor="width">Width (px)</label>
            <input
              id="width"
              type="number"
              min="1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="1200"
            />
          </div>

          <div className="form-row">
            <label htmlFor="height">Height (px)</label>
            <input
              id="height"
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Leave blank to auto-scale"
            />
          </div>

          <div className="toggle-row">
            <input
              id="preserve"
              type="checkbox"
              checked={preserveAspect}
              onChange={(e) => setPreserveAspect(e.target.checked)}
            />
            <label htmlFor="preserve">Preserve aspect ratio</label>
          </div>
        </div>

        <div className="preset-row">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="btn btn-secondary"
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={runResize}
            disabled={loading || files.length === 0}
          >
            {loading ? "Resizing..." : "Resize images"}
          </button>
        </div>

        {error ? <div className="error-box">{error}</div> : null}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Results</h2>
          <p>Download each resized image after processing completes.</p>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">Your resized images will appear here.</div>
        ) : (
          <>
            <div className="hero-actions hero-actions-left">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleZipDownload}
                disabled={zipLoading}
              >
                {zipLoading ? "Creating ZIP..." : "Download all as ZIP"}
              </button>
            </div>

            <div className="results-list">
              {results.map((item) => (
                <div key={item.url} className="result-card">
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.width} × {item.height} • {formatBytes(item.size)}
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
              ))}
            </div>
          </>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Related tools</h2>
          <p>More tools will be added here as we build them out.</p>
        </div>

        <div className="card-grid">
          <a className="tool-card" href="/compress-image">
            <div className="tool-card-top">
              <h3>Compress Image</h3>
              <span>Ready</span>
            </div>
            <p>Reduce file size after resizing.</p>
          </a>

          <a className="tool-card" href="/heic-to-jpg">
            <div className="tool-card-top">
              <h3>HEIC to JPG</h3>
              <span>Ready</span>
            </div>
            <p>Convert iPhone photos into a more upload-friendly format.</p>
          </a>

          <a className="tool-card" href="/compress-pdf">
            <div className="tool-card-top">
              <h3>Compress PDF</h3>
              <span>Ready</span>
            </div>
            <p>Shrink PDFs that are too large for upload limits.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
