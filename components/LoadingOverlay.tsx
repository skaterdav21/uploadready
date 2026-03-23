export default function LoadingOverlay({ text = "Processing..." }: { text?: string }) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner" />
        <p>{text}</p>
      </div>
    </div>
  );
}
