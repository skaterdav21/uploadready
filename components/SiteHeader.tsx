export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="brand">
          <span className="brand-logo-wrap" aria-hidden="true">
            <img src="/icon.png" alt="" className="brand-logo" />
          </span>

          <span className="brand-text">
            <span className="brand-name">UploadReady</span>
            <span className="brand-tag">Fix your files so they actually upload</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/resume-upload-fixer">Resume Fixer</a>
          <a href="/pdf-too-large-to-upload">PDF Too Large</a>
          <a href="/iphone-photo-wont-upload">iPhone Photo Help</a>
          <a href="/resize-image">Resize Image</a>
          <a href="/compress-image">Compress Image</a>
          <a href="/heic-to-jpg">HEIC to JPG</a>
          <a href="/merge-pdf">Merge PDF</a>
          <a href="/split-pdf">Split PDF</a>
          <a href="/compress-pdf">Compress PDF</a>
        </nav>
      </div>
    </header>
  );
}
