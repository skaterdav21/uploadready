export default function Home() {
  const imageTools = [
    {
      title: "HEIC to JPG",
      href: "/heic-to-jpg",
      desc: "Convert iPhone HEIC photos into upload-friendly JPG files.",
    },
    {
      title: "Resize Image",
      href: "/resize-image",
      desc: "Resize photos for forms, email, and websites without guessing dimensions.",
    },
    {
      title: "Compress Image",
      href: "/compress-image",
      desc: "Reduce image file size so uploads stop failing.",
    },
  ];

  const pdfTools = [
    {
      title: "Compress PDF",
      href: "/compress-pdf",
      desc: "Shrink PDF size with a privacy-first browser workflow.",
    },
    {
      title: "Merge PDF",
      href: "/merge-pdf",
      desc: "Combine multiple PDFs into one clean file.",
    },
    {
      title: "Split PDF",
      href: "/split-pdf",
      desc: "Extract pages or split a PDF into smaller parts.",
    },
  ];

  const faqs = [
    {
      q: "Do my files stay private?",
      a: "Yes. UploadReady is designed to process files in your browser whenever possible, so your files stay on your device.",
    },
    {
      q: "What kinds of files can I fix here?",
      a: "UploadReady focuses on common upload problems for images and PDFs, including converting, compressing, resizing, merging, and splitting.",
    },
    {
      q: "Will compression always make files much smaller?",
      a: "Not always. Results depend on the original file. Large photos and oversized PDFs usually improve the most.",
    },
  ];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-badge">Private • Fast • Upload-friendly</div>
        <h1>Fix your files so they actually upload</h1>
        <p className="hero-copy">
          Convert, resize, compress, merge, and split image and PDF files with a
          simple, trustworthy workflow built for real upload problems.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#tools">
            Explore tools
          </a>
          <a className="btn btn-secondary" href="#faq">
            See FAQs
          </a>
        </div>

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="trust-strip">
        <div className="trust-card">Private</div>
        <div className="trust-card">Fast</div>
        <div className="trust-card">Bulk-friendly</div>
        <div className="trust-card">Simple</div>
      </section>

      <section id="tools" className="section">
        <div className="section-head">
          <h2>Fix Images</h2>
          <p>Quick tools for photos that are too large, wrong format, or rejected by forms.</p>
        </div>

        <div className="card-grid">
          {imageTools.map((tool) => (
            <a key={tool.title} className="tool-card" href={tool.href}>
              <div className="tool-card-top">
                <h3>{tool.title}</h3>
                <span>Open</span>
              </div>
              <p>{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Fix PDFs</h2>
          <p>Useful PDF actions for upload limits, document cleanup, and combining files.</p>
        </div>

        <div className="card-grid">
          {pdfTools.map((tool) => (
            <a key={tool.title} className="tool-card" href={tool.href}>
              <div className="tool-card-top">
                <h3>{tool.title}</h3>
                <span>Open</span>
              </div>
              <p>{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <div className="panel">
          <h2>Built for real upload problems</h2>
          <p>
            UploadReady is not trying to be a giant design app. It is focused on
            one job: fixing files so forms, portals, and websites accept them.
          </p>
          <ul>
            <li>Simple workflows</li>
            <li>Clear controls</li>
            <li>No clutter</li>
            <li>Privacy-first processing</li>
          </ul>
        </div>

        <div className="panel">
          <div className="ad-box ad-box-tall">Ad placeholder</div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="section-head">
          <h2>Frequently asked questions</h2>
          <p>Clear answers for privacy, compatibility, and file size expectations.</p>
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

      <footer className="footer">
        <div>
          <strong>UploadReady</strong>
          <p>Fix your files so they actually upload.</p>
        </div>

        <div className="footer-links">
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
