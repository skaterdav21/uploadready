export default function PdfTooLargePage() {
  const fixes = [
    {
      title: "Compress the PDF",
      body: "Start here if the site rejects your resume, form, or document because the file size is too large.",
      href: "/compress-pdf",
      cta: "Compress PDF",
    },
    {
      title: "Split out only the needed pages",
      body: "If the portal only needs one section, transcript page, or document page, split the file instead of uploading everything.",
      href: "/split-pdf",
      cta: "Split PDF",
    },
    {
      title: "Merge only what matters",
      body: "If you combined too many supporting PDFs, rebuild a cleaner version with only the files you actually need.",
      href: "/merge-pdf",
      cta: "Merge PDFs",
    },
  ];

  const examples = [
    "Resume PDF too large for a job application",
    "School or scholarship portal rejects your upload",
    "Government site has strict file size limits",
    "Insurance, HR, or onboarding form refuses a PDF",
    "A document portal accepts PDF but only under a small size cap",
  ];

  const faqs = [
    {
      q: "Why is my PDF too large to upload?",
      a: "Usually because it contains large images, scans, screenshots, or too many pages. Some portals also have extremely small upload limits.",
    },
    {
      q: "What should I try first?",
      a: "Start with Compress PDF. If the result is still too large, split out only the pages the portal actually needs.",
    },
    {
      q: "Will compression always make the PDF much smaller?",
      a: "Not always. Browser-side compression helps, but some PDFs are already optimized. Image-heavy PDFs usually have more room to shrink.",
    },
    {
      q: "What if the website only allows one document?",
      a: "Use Merge PDF to rebuild a cleaner single upload file after removing anything unnecessary.",
    },
  ];

  return (
    <main className="page">
      <section className="hero hero-animated">
        <div className="hero-badge">Common upload problem</div>
        <h1>PDF Too Large to Upload?</h1>
        <p className="hero-copy">
          If a website is rejecting your PDF because the file is too large,
          UploadReady helps you shrink it, split it, or rebuild a cleaner version
          so the upload actually works.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="/compress-pdf">
            Compress PDF now
          </a>
          <a className="btn btn-secondary" href="#fixes">
            See all fixes
          </a>
        </div>

        <div className="hero-usecases">
          <span className="usecase-chip">Resume upload failed</span>
          <span className="usecase-chip">School portal size limit</span>
          <span className="usecase-chip">Government form upload</span>
          <span className="usecase-chip">Document too heavy</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>When this usually happens</h2>
          <p>
            These are the most common situations where people run into PDF size limits.
          </p>
        </div>

        <div className="faq-list">
          {examples.map((item) => (
            <div key={item} className="faq-item">
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="fixes" className="section">
        <div className="section-head">
          <h2>Best fixes for oversized PDFs</h2>
          <p>
            Choose the path that matches your upload problem.
          </p>
        </div>

        <div className="problem-grid">
          {fixes.map((item) => (
            <a key={item.title} href={item.href} className="problem-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.cta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <div className="panel">
          <h2>Quick rule of thumb</h2>
          <ul>
            <li>Too large but same document needed? Compress PDF</li>
            <li>Only certain pages needed? Split PDF</li>
            <li>Too many separate docs combined badly? Rebuild with Merge PDF</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Useful for real-world uploads</h2>
          <p>
            This is especially common with resumes, transcripts, application packets,
            school documents, onboarding files, tax forms, and scanned PDFs.
          </p>

          <div className="hero-actions hero-actions-left">
            <a className="btn btn-primary" href="/compress-pdf">
              Fix oversized PDF
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Frequently asked questions</h2>
          <p>
            Clear answers for one of the most common upload issues on the web.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item) => (
            <div key={item.q} className="faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
