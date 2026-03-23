export default function AboutPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <h1>About UploadReady</h1>
          <p>
            UploadReady exists for one reason: to fix files so they actually upload.
          </p>
        </div>

        <div className="faq-list">
          <div className="faq-item">
            <h3>Built for real upload problems</h3>
            <p>
              Too many sites reject files because they are too large, the wrong format,
              or bundled incorrectly. UploadReady focuses on the most common image and
              PDF problems people hit every day.
            </p>
          </div>

          <div className="faq-item">
            <h3>Privacy first</h3>
            <p>
              Whenever possible, processing happens directly in your browser so files
              stay on your device. That keeps the experience faster and more trustworthy.
            </p>
          </div>

          <div className="faq-item">
            <h3>Simple on purpose</h3>
            <p>
              This is not a giant editing suite. It is a practical utility site designed
              to solve frustrating upload issues with a clear, low-clutter workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="section split-panel">
        <div className="panel">
          <h2>What UploadReady helps with</h2>
          <ul>
            <li>Converting HEIC photos into JPG files</li>
            <li>Resizing oversized images for forms and portals</li>
            <li>Compressing images to meet upload size limits</li>
            <li>Compressing PDFs when file size is too large</li>
            <li>Merging multiple PDFs into one file</li>
            <li>Splitting PDFs into smaller parts or extracting pages</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Who it is for</h2>
          <p>
            UploadReady is useful for students, job applicants, office staff, small
            business owners, and anyone dealing with forms, portals, document uploads,
            or websites with strict file requirements.
          </p>
        </div>
      </section>
    </main>
  );
}
