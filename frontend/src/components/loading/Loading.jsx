import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite" aria-label="Loading">
      <span className="loading-spinner" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
