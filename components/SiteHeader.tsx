export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core">↑</span>
          </span>
          <span className="brand-text">
            <span className="brand-name">UploadReady</span>
            <span className="brand-tag">Fix your files so they actually upload</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="/">Home</a>
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
