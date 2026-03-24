"use client";

export const dynamic = "force-dynamic";

import { useRef, useState } from "react";

type OutputFile = {
  url: string;
  size: number;
  originalSize: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function compressPdf(file: File): Promise<OutputFile> {
  const { PDFDocument } = await import("pdf-lib");

  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
  pages.forEach((p) => newPdf.addPage(p));

  const newBytes = await newPdf.save();
  const safeBytes = Uint8Array.from(newBytes);

  const blob = new Blob([safeBytes], {
    type: "application/pdf",
  });

  return {
    url: URL.createObjectURL(blob),
    size: blob.size,
    originalSize: file.size,
  };
}

export default function CompressPdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<OutputFile | null>(null);

  function handleFile(list: FileList | null) {
    if (!list || list.length === 0) return;

    setError("");
    setResult(null);

    const first = Array.from(list).find((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );

    if (!first) {
      setFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setFile(first);
  }

  async function runCompression() {
    if (!file) {
      setError("Add a PDF first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const compressed = await compressPdf(file);
      setResult(compressed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compress PDF.");
    } finally {
      setLoading(false);
    }
  }

  function download(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.pdf";
    a.click();
  }

  const percentSaved =
    result && result.originalSize > 0
      ? Math.max(
          0,
          Math.round(
            ((result.originalSize - result.size) / result.originalSize) * 100
          )
        )
      : 0;

  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <h1>Compress PDF</h1>
          <p>
            Reduce PDF size directly in your browser. Results vary depending on
            how the original file was created.
          </p>
        </div>

        <div className="pdf-tool-nav">
          <a href="/merge-pdf" className="pdf-tool-link">
            Merge PDF
          </a>
          <a href="/split-pdf" className="pdf-tool-link">
            Split PDF
          </a>
          <a href="/compress-pdf" className="pdf-tool-link pdf-tool-link-active">
            Compress PDF
          </a>
        </div>

        <div
          className="upload-box"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files);
          }}
        >
          <strong>Drop a PDF here</strong>
          <p>or click to upload</p>
          <span className="upload-meta">
            {file ? file.name : "No PDF selected"}
          </span>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => handleFile(e.target.files)}
          />
        </div>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={runCompression}
            disabled={loading || !file}
          >
            {loading ? "Compressing..." : "Compress PDF"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Result</h2>
          <p>
            Compression results depend on the file. Image-heavy PDFs may shrink
            more than text-based ones.
          </p>
        </div>

        {!result ? (
          <div className="empty-state">
            Your compressed PDF will appear here.
          </div>
        ) : (
          <div className="result-card">
            <div>
              <h3>compressed.pdf</h3>
              <p>
                Before: {formatBytes(result.originalSize)} • After:{" "}
                {formatBytes(result.size)} • Saved: {percentSaved}%
              </p>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => download(result.url)}
            >
              Download
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
