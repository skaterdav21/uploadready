export default function Home() {
  const imageTools = [
    {
      title: "HEIC to JPG",
      href: "/heic-to-jpg",
      desc: "Convert iPhone HEIC photos into JPG files that forms and job sites actually accept.",
    },
    {
      title: "Resize Image",
      href: "/resize-image",
      desc: "Shrink oversized images for online forms, email attachments, portals, and applications.",
    },
    {
      title: "Compress Image",
      href: "/compress-image",
      desc: "Reduce image file size when a website rejects your upload for being too large.",
    },
  ];

  const pdfTools = [
    {
      title: "Compress PDF",
      href: "/compress-pdf",
      desc: "Make PDFs smaller for upload limits on resumes, school forms, tax portals, and document systems.",
    },
    {
      title: "Merge PDF",
      href: "/merge-pdf",
      desc: "Combine multiple PDFs into one file when a portal only allows a single upload.",
    },
    {
      title: "Split PDF",
      href: "/split-pdf",
      desc: "Extract selected pages or break apart a PDF when you only need one section.",
    },
  ];

  const problems = [
    {
      title: "Your resume PDF is too large",
      body: "Compress it before uploading to a job application portal that rejects big files.",
      href: "/compress-pdf",
    },
    {
      title: "Your iPhone photo will not upload",
      body: "Convert HEIC to JPG so online forms and websites can read it.",
      href: "/heic-to-jpg",
    },
    {
      title: "Your image is too big for the form",
      body: "Resize or compress it before uploading to government, school, or HR portals.",
      href: "/resize-image",
    },
    {
      title: "You need one single PDF upload",
      body: "Merge separate PDFs like resume, cover letter, and supporting docs into one file.",
      href: "/merge-pdf",
    },
    {
      title: "You only need one page from a PDF",
      body: "Split a large PDF and extract just the pages a site is asking for.",
      href: "/split-pdf",
    },
    {
      title: "A screenshot or image is too heavy",
      body: "Compress it for email, intake forms, reimbursements, claims, or web forms.",
      href: "/compress-image",
    },
  ];

  const useCases = [
    "Job applications and resume uploads",
    "Tax and government portals",
    "Insurance, claims, and HR documents",
    "School applications and scholarship forms",
    "Attaching files to emails",
    "Converting iPhone photos for web forms",
  ];

  const faqs = [
    {
      q: "What is UploadReady actually for?",
      a: "UploadReady is for the annoying moment when a website rejects your file because it is too large, the wrong format, or not split or merged the way the portal expects.",
    },
    {
      q: "Who would use this?",
      a: "People applying for jobs, submitting school paperwork, sending tax documents, uploading insurance files, attaching files to forms, or fixing iPhone photos that will not upload.",
    },
    {
      q: "Do my files stay private?",
      a: "Yes. UploadReady is designed to process files in your browser whenever possible, so your files stay on your device.",
    },
    {
      q: "What should I use for a resume upload?",
      a: "Usually Compress PDF if the resume is too large, Merge PDF if you need one file, and Resize Image if you also need to upload a headshot or portfolio image.",
    },
  ];

  return (
    <main className="page">
      <section className="hero hero-animated">
        <div className="hero-badge">Built for real upload problems</div>

        <h1>Fix your files so they actually upload</h1>

        <p className="hero-copy">
          UploadReady helps with the frustrating stuff that blocks uploads: files
          that are too large, the wrong format, split the wrong way, or spread
          across too many documents.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#problem-first">
            Start with your problem
          </a>
          <a className="btn btn-secondary" href="#tools">
            Browse all tools
          </a>
        </div>

        <div className="hero-usecases">
          {useCases.map((item) => (
            <span key={item} className="usecase-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="ad-box">Ad placeholder</div>
      </section>

      <section className="trust-strip">
        <div className="trust-card">Private</div>
        <div className="trust-card">Fast</div>
        <div className="trust-card">Practical</div>
        <div className="trust-card">Upload-friendly</div>
      </section>

      <section id="problem-first" className="section">
        <div className="section-head">
          <h2>Start with the problem you are trying to solve</h2>
          <p>
            Most people do not care about file tools. They care about getting the
            upload to work. Start there.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((item) => (
            <a key={item.title} href={item.href} className="problem-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>Open tool</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <div className="panel">
          <h2>Common real-world use cases</h2>
          <ul>
            <li>Uploading a resume to a job application site with a file size limit</li>
            <li>Combining your resume and cover letter into one PDF upload</li>
            <li>Converting iPhone HEIC photos before submitting a form</li>
            <li>Resizing documents or screenshots for government and school portals</li>
            <li>Splitting a long PDF to upload only the requested pages</li>
            <li>Compressing attachments before sending them by email</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Resume and application prep</h2>
          <p>
            A lot of upload problems happen during job applications. If your resume
            is too large, compress the PDF. If the application only allows one
            upload, merge supporting files. If you need to submit a headshot or
            image, resize or compress it first.
          </p>

          <div className="hero-actions hero-actions-left">
            <a className="btn btn-primary" href="/compress-pdf">
              Fix a resume PDF
            </a>
            <a className="btn btn-secondary" href="/merge-pdf">
              Merge application PDFs
            </a>
          </div>
        </div>
      </section>

      <section id="tools" className="section">
        <div className="section-head">
          <h2>Fix Images</h2>
          <p>
            Use these when a photo or image will not upload because it is too large
            or in the wrong format.
          </p>
        </div>

        <div className="card-grid">
          {imageTools.map((tool) => (
            <a key={tool.title} className="tool-card tool-card-animated" href={tool.href}>
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
          <p>
            Use these when you need to shrink, combine, or split documents for an
            upload portal.
          </p>
        </div>

        <div className="card-grid">
          {pdfTools.map((tool) => (
            <a key={tool.title} className="tool-card tool-card-animated" href={tool.href}>
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
          <h2>Frequently asked questions</h2>
          <p>
            Clear answers for privacy, compatibility, and the kinds of upload
            problems this site is built to solve.
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
