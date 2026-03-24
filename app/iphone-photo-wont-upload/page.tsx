export default function IphonePhotoWontUploadPage() {
  const fixes = [
    {
      title: "Convert HEIC to JPG",
      body: "Most websites, forms, and job portals still prefer JPG over HEIC from iPhones.",
      href: "/heic-to-jpg",
      cta: "Convert HEIC",
    },
    {
      title: "Resize the image",
      body: "If your photo is valid but too large in dimensions, resize it before trying again.",
      href: "/resize-image",
      cta: "Resize Image",
    },
    {
      title: "Compress the image",
      body: "If the file size is too big, compress it so it fits stricter upload rules.",
      href: "/compress-image",
      cta: "Compress Image",
    },
  ];

  const examples = [
    "A website says the image format is not supported",
    "An application portal rejects your iPhone photo",
    "A profile image or ID photo upload fails",
    "The file is accepted, but it exceeds the upload limit",
    "A government or school portal will not take HEIC images",
  ];

  const faqs = [
    {
      q: "Why do iPhone photos fail to upload?",
      a: "Because many iPhones save photos as HEIC, and plenty of websites still do not support HEIC uploads properly.",
    },
    {
      q: "What should I try first?",
      a: "Convert the file to JPG first. That solves the format problem for many websites immediately.",
    },
    {
      q: "What if JPG still does not upload?",
      a: "Then the next likely issue is file size or image dimensions. Use Resize Image or Compress Image after converting.",
    },
    {
      q: "Is JPG better for forms and portals?",
      a: "Usually yes. JPG is still much more widely accepted across job applications, account settings, web forms, and document portals.",
    },
  ];

  return (
    <main className="page">
      <section className="hero hero-animated">
        <div className="hero-badge">Common iPhone upload problem</div>
        <h1>iPhone Photo Won’t Upload?</h1>
        <p className="hero-copy">
          If a website or application is rejecting your iPhone photo, the problem
          is usually HEIC format, image size, or file size. UploadReady helps you
          fix all three.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="/heic-to-jpg">
            Convert to JPG
          </a>
          <a className="btn btn-secondary" href="#fixes">
            See all fixes
          </a>
        </div>

        <div className="hero-usecases">
          <span className="usecase-chip">HEIC not supported</span>
          <span className="usecase-chip">Profile photo rejected</span>
          <span className="usecase-chip">Job portal image upload failed</span>
          <span className="usecase-chip">ID photo too large</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>When this usually happens</h2>
          <p>
            These are the most common reasons iPhone image uploads fail.
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
          <h2>Best fixes for rejected iPhone photos</h2>
          <p>
            Start with format first, then size if needed.
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
          <h2>Best order to fix an iPhone upload</h2>
          <ul>
            <li>Convert HEIC to JPG first</li>
            <li>Resize if the image dimensions are too large</li>
            <li>Compress if the file size is still too big</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Useful for real-world uploads</h2>
          <p>
            This comes up often with profile photos, school portals, job applications,
            government forms, insurance claims, and account verification uploads.
          </p>

          <div className="hero-actions hero-actions-left">
            <a className="btn btn-primary" href="/heic-to-jpg">
              Fix iPhone photo
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Frequently asked questions</h2>
          <p>
            Quick answers for one of the most common phone-to-website upload problems.
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
