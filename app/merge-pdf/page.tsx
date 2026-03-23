"use client";

export const dynamic = "force-dynamic";

import { useMemo, useRef, useState } from "react";

type OutputFile = {
  url: string;
  size: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function mergePdfFiles(files: File[]): Promise<OutputFile> {
  const { PDFDocument } = await import("pdf-lib");

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((p) => mergedPdf.addPage(p));
  }

  const mergedBytes = await mergedPdf.save();
  const safeBytes = Uint8Array.from(mergedBytes);

  const blob = new Blob([safeBytes], {
    type: "application/pdf",
  });

  return {
    url: URL.createObjectURL(blob),
    size: blob.size,
  };
}

export default function MergePdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<OutputFile | null>(null);

  const selectedText = useMemo(() => {
    if (files.length === 0) return "No PDFs selected";
    if (files.length === 1) return "1 PDF selected";
    return `${files.length} PDFs selected`;
  }, [files.length]);

  function handleFiles(list: FileList | null) {
    if (!list) return;

    setError("");
    setResult(null);

    const accepted = Array.from(list).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );

    if (accepted.length === 0) {
      setFiles([]);
      setError("Please select PDF files.");
      return;
    }

    setFiles(accepted);
  }

  async function runMerge() {
    if (files.length < 2) {
      setError("Select at least 2 PDFs to merge.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const merged = await mergePdfFiles(files);
      setResult(merged);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  }

  function download(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
  }

  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <h1>Merge PDF</h1>
          <p>
            Combine multiple PDF files into a single document directly in your
            browser.
          </p>
        </div>

        <div
          className="upload-box"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <strong>Drop PDF files here</strong>
          <p>or click to upload</p>
          <span className="upload-meta">{selectedText}</span>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={runMerge}
            disabled={loading}
          >
            {loading ? "Merging..." : "Merge PDFs"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Result</h2>
        </div>

        {!result ? (
          <div className="empty-state">Your merged PDF will appear here.</div>
        ) : (
          <div className="result-card">
            <div>
              <h3>merged.pdf</h3>
              <p>{formatBytes(result.size)}</p>
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
