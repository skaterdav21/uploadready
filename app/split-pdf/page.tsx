"use client";

export const dynamic = "force-dynamic";

import { useRef, useState } from "react";

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

function parsePageRanges(input: string, totalPages: number): number[] {
  const pages = new Set<number>();

  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = Number(startStr);
      const end = Number(endStr);

      if (
        Number.isNaN(start) ||
        Number.isNaN(end) ||
        start < 1 ||
        end < 1 ||
        start > end
      ) {
        throw new Error(`Invalid page range: ${trimmed}`);
      }

      for (let p = start; p <= end; p++) {
        if (p <= totalPages) pages.add(p - 1);
      }
    } else {
      const page = Number(trimmed);
      if (Number.isNaN(page) || page < 1) {
        throw new Error(`Invalid page number: ${trimmed}`);
      }
      if (page <= totalPages) pages.add(page - 1);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

async function splitPdfFile(
  file: File,
  rangeInput: string
): Promise<OutputFile[]> {
  const { PDFDocument } = await import("pdf-lib");

  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);
  const totalPages = sourcePdf.getPageCount();

  if (!rangeInput.trim()) {
    const outputs: OutputFile[] = [];

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(sourcePdf, [i]);
      newPdf.addPage(page);

      const newBytes = await newPdf.save();
      const safeBytes = Uint8Array.from(newBytes);
      const blob = new Blob([safeBytes], { type: "application/pdf" });
      const base = file.name.replace(/\.pdf$/i, "");

      outputs.push({
        name: `${base}-page-${i + 1}.pdf`,
        url: URL.createObjectURL(blob),
        size: blob.size,
      });
    }

    return outputs;
  }

  const selectedPages = parsePageRanges(rangeInput, totalPages);

  if (selectedPages.length === 0) {
    throw new Error("No valid pages selected.");
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(sourcePdf, selectedPages);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const newBytes = await newPdf.save();
  const safeBytes = Uint8Array.from(newBytes);
  const blob = new Blob([safeBytes], { type: "application/pdf" });
  const base = file.name.replace(/\.pdf$/i, "");

  return [
    {
      name: `${base}-extracted.pdf`,
      url: URL.createObjectURL(blob),
      size: blob.size,
    },
  ];
}

export default function SplitPdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageRanges, setPageRanges] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<OutputFile[]>([]);

  function clearResults() {
    results.forEach((item) => URL.revokeObjectURL(item.url));
    setResults([]);
  }

  function handleFile(list: FileList | null) {
    if (!list || list.length === 0) return;

    clearResults();
    setError("");

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

  async function runSplit() {
    if (!file) {
      setError("Add a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    clearResults();

    try {
      const output = await splitPdfFile(file, pageRanges);
      setResults(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to split PDF.");
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
          <h1>Split PDF</h1>
          <p>
            Extract selected pages or split a PDF into individual page files
            directly in your browser.
          </p>
        </div>

        <div className="pdf-tool-nav">
          <a href="/merge-pdf" className="pdf-tool-link">
            Merge PDF
          </a>
          <a href="/split-pdf" className="pdf-tool-link pdf-tool-link-active">
            Split PDF
          </a>
          <a href="/compress-pdf" className="pdf-tool-link">
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

        <div className="tool-controls">
          <div className="form-row" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="ranges">Page ranges</label>
            <input
              id="ranges"
              type="text"
              value={pageRanges}
              onChange={(e) => setPageRanges(e.target.value)}
              placeholder="Examples: 1-3,5,8   or leave blank to split every page"
            />
          </div>
        </div>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={runSplit}
            disabled={loading || !file}
          >
            {loading ? "Splitting..." : "Split PDF"}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Results</h2>
          <p>
            Leave page ranges blank to create one PDF per page, or enter specific
            pages to extract.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            Your split PDF files will appear here.
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
