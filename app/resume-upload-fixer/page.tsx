export default function ResumeUploadFixerPage() {
  const quickFixes = [
    {
      title: "My resume PDF is too large",
      desc: "Use PDF compression when an application portal rejects your resume because of file size limits.",
      href: "/compress-pdf",
      cta: "Compress PDF",
    },
    {
      title: "I need one single upload file",
      desc: "Merge your resume, cover letter, and supporting PDFs into one clean document if the portal only allows one upload.",
      href: "/merge-pdf",
      cta: "Merge PDFs",
    },
    {
      title: "I only need certain pages",
      desc: "Split out a transcript page, portfolio page, or a single document section when the application only wants part of a PDF.",
      href: "/split-pdf",
      cta: "Split PDF",
    },
    {
      title: "My headshot or portfolio image is too large",
      desc: "Resize or compress images before uploading profile photos, samples, or portfolio screenshots.",
      href: "/resize-image",
      cta: "Resize Image",
    },
    {
      title: "My iPhone photo will not upload",
      desc: "Convert HEIC images to JPG so application systems and forms accept them.",
      href: "/heic-to-jpg",
      cta: "Convert HEIC",
    },
    {
      title: "My screenshot or image attachment is too heavy",
      desc: "Compress image files so they fit stricter upload rules for forms and job portals.",
      href: "/compress-image",
      cta: "Compress Image",
    },
  ];

  const commonProblems = [
    "A job application says your resume file is too large",
    "The portal only allows one PDF upload",
    "You need to upload only one page from a longer file",
    "Your profile photo or portfolio image exceeds the size limit",
    "A website rejects your iPhone HEIC image",
    "A form accepts only JPG or smaller PDF files",
  ];

  const steps = [
    {
      title: "Start with the file type",
      body: "If it is a resume or document, use the PDF tools. If it is a headshot, screenshot, or image sample, use the image tools.",
    },
    {
      title: "Fix the upload problem",
      body: "Compress oversized files, merge separate PDFs, split out only the needed pages, or convert HEIC photos to JPG.",
    },
    {
      title: "Upload the cleaned file",
      body: "Download the updated file and use that version in your job application, school form, or hiring portal.",
    },
  ];

  const faqs = [
    {
      q: "What is the best format for a resume upload?",
      a: "Usually PDF. Most job portals expect a PDF resume because it preserves formatting better than a Word document.",
    },
    {
      q: "What if my resume PDF is too large?",
      a: "Use Compress PDF first. If your document still feels too large, remove unnecessary pages or image-heavy content before uploading.",
    },
    {
      q: "What if the application allows only one upload?",
      a: "Use Merge PDF to combine your resume, cover letter, and other supporting documents into one file.",
    },
    {
      q: "Can I fix headshots or portfolio images too?",
      a: "Yes. Use Resize Image or Compress Image if you need smaller image files, and use HEIC to JPG for iPhone photos.",
    },
  ];

  return (
    <main className="page">
      <section className="hero hero-animated">
        <div className="hero-badge">Job application file help</div>

        <h1>Resume Upload Fixer</h1>

        <p className="hero-copy">
          Fix common upload problems for resumes, cover letters, transcripts,
          headshots, and job application documents. If a hiring portal rejects
          your file, this page helps you choose the right fix fast.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#quick-fixes">
            Find the right fix
          </a>
          <a className="btn btn-secondary" href="/compress-pdf">
            Start with PDF compression
          </a>
        </div>

        <div className="hero-usecases">
          <span className="usecase-chip">Resume too large</span>
          <span className="usecase-chip">Cover letter + resume in one PDF</span>
          <span className="usecase-chip">HEIC photo will not upload</span>
          <span className="usecase-chip">Profile image too big</span>
          <span className="usecase-chip">Only one file allowed</span>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-card">Job-ready</div>
        <div className="trust-card">Private</div>
        <div className="trust-card">Fast</div>
        <div className="trust-card">No confusion</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Common job application upload problems</h2>
          <p>
            If any of these sound familiar, you are in the right place.
          </p>
        </div>

        <div className="faq-list">
          {commonProblems.map((problem) => (
            <div key={problem} className="faq-item">
              <h3>{problem}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="quick-fixes" className="section">
        <div className="section-head">
          <h2>Choose the fix that matches your problem</h2>
          <p>
            Start with the specific issue that is blocking your upload.
          </p>
        </div>

        <div className="problem-grid">
          {quickFixes.map((item) => (
            <a key={item.title} href={item.href} className="problem-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span>{item.cta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <div className="panel">
          <h2>How to use UploadReady for job applications</h2>
          <div className="faq-list">
            {steps.map((step, index) => (
              <div key={step.title} className="faq-item">
                <h3>
                  Step {index + 1}: {step.title}
                </h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Typical resume upload workflow</h2>
          <ul>
            <li>Finish your resume and export it to PDF</li>
            <li>Compress the PDF if the site has a file size limit</li>
            <li>Merge in your cover letter if only one file is allowed</li>
            <li>Split pages out if the portal only requests part of a file</li>
            <li>Resize or compress images if you also need to upload a headshot</li>
          </ul>

          <div className="hero-actions hero-actions-left">
            <a className="btn btn-primary" href="/compress-pdf">
              Fix resume PDF
            </a>
            <a className="btn btn-secondary" href="/merge-pdf">
              Combine PDFs
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Frequently asked questions</h2>
          <p>
            Quick answers for resume and job application upload issues.
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

      <section className="section">
        <div className="section-head">
          <h2>Related tools</h2>
          <p>
            Use these tools directly if you already know what you need.
          </p>
        </div>

        <div className="card-grid">
          <a className="tool-card" href="/compress-pdf">
            <div className="tool-card-top">
              <h3>Compress PDF</h3>
              <span>Ready</span>
            </div>
            <p>Make your resume PDF smaller for upload limits.</p>
          </a>

          <a className="tool-card" href="/merge-pdf">
            <div className="tool-card-top">
              <h3>Merge PDF</h3>
              <span>Ready</span>
            </div>
            <p>Combine resume, cover letter, and supporting docs into one file.</p>
          </a>

          <a className="tool-card" href="/resize-image">
            <div className="tool-card-top">
              <h3>Resize Image</h3>
              <span>Ready</span>
            </div>
            <p>Resize headshots, profile images, and portfolio visuals.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
