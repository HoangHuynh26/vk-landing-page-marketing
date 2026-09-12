import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import "./LiveNotification.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function LiveNotification({ demo = true }) {
  const { language, t } = useLanguage();
  const [toasts, setToasts] = useState([]);

  // Curated list of ~30 real Western Australia nail salons & spas
  const businesses = useMemo(
    () => [
      "Peachi Nails",
      "HALLÉDAYS",
      "Glamour Nail Bar",
      "High Society Nails & Beauty",
      "House Of Ten",
      "Crown Spa Perth",
      "Djurra Day Spa",
      "endota spa Fremantle",
      "Fremantle Nail Spa",
      "Opal Nails Joondalup",
      "endota spa Joondalup",
      "BODHI Wellness Spa Retreat",
      "Cottesloe Nails & Spa",
      "Signature Nails South Perth",
      "Jane’s Nail Salon & Spa",
      "Zoe’s Boutique Beauty Salon",
      "NaiLovers Spa Bunbury",
      "Polished Nails and Spa",
      "Divine Nails Studio",
      "Opal Nails Karrinyup",
      "Golden Nails & Beauty",
      "Oscar Nails Galleria",
      "Nail Studio at Carousel",
      "Yen’s Nails & Beauty Lounge",
      "Lvo Beauty Lounge",
      "Harmony Nails & Beauty",
      "The Perfect Look Nails",
      "Ocean Breeze Day Spa",
      "Serenity Spa & Nails",
      "Albany Coastal Nails & Spa",
      "Coral Coast Nails & Spa",
      "Goldfields Day Spa & Nails",
    ],
    [],
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isExiting: true } : item,
      ),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 380);
  }, []);

  const handleReturnHome = useCallback(
    (toastId) => {
      removeToast(toastId);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const topElem = document.getElementById("top");
      if (topElem) {
        topElem.scrollIntoView({ behavior: "smooth" });
      }
      if (window.location.hash && window.location.hash.includes("lead-form")) {
        window.history.pushState(
          "",
          document.title,
          window.location.pathname + window.location.search,
        );
      }
    },
    [removeToast],
  );

  // Listen for custom "show-toast" events (from form success/failure or any component)
  useEffect(() => {
    const handleShowToast = (event) => {
      const detail = event.detail || {};
      const newToast = {
        id: detail.id || Date.now() + Math.random(),
        type: detail.type || "info", // "success" | "error" | "live" | "info"
        title: detail.title,
        message: detail.message,
        duration: detail.duration || 6000,
        autoReturnHome: Boolean(detail.autoReturnHome),
        createdAt: Date.now(),
        isExiting: false,
      };

      setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Stack up to 4 toasts
    };

    window.addEventListener("show-toast", handleShowToast);
    return () => window.removeEventListener("show-toast", handleShowToast);
  }, []);

  // Periodic Live Social Proof Notification
  const businessIndexRef = useRef(0);
  useEffect(() => {
    if (!demo) return undefined;

    let showTimer;
    const scheduleNext = () => {
      showTimer = window.setTimeout(() => {
        businessIndexRef.current =
          (businessIndexRef.current + 1) % businesses.length;
        const biz = businesses[businessIndexRef.current];
        const phrase =
          t("notification.receivedReview") ||
          (language === "vi"
            ? "vừa nhận bản đánh giá marketing miễn phí."
            : "received a free marketing review.");
        const text = `${biz} ${phrase}`;

        const liveToast = {
          id: Date.now() + Math.random(),
          type: "live",
          message: text,
          duration: 5000,
          isExiting: false,
        };

        setToasts((prev) => [
          liveToast,
          ...prev.filter((item) => item.type !== "live").slice(0, 2),
        ]);
        scheduleNext();
      }, 12000);
    };

    // Trigger initial notification after 3.5s so visitors see activity
    const initialTimer = window.setTimeout(() => {
      const biz = businesses[0];
      const phrase =
        t("notification.receivedReview") ||
        (language === "vi"
          ? "vừa nhận bản đánh giá marketing miễn phí."
          : "received a free marketing review.");
      const text = `${biz} ${phrase}`;

      const liveToast = {
        id: Date.now() + Math.random(),
        type: "live",
        message: text,
        duration: 5000,
        isExiting: false,
      };
      setToasts((prev) => [
        liveToast,
        ...prev.filter((item) => item.type !== "live").slice(0, 2),
      ]);
      scheduleNext();
    }, 3500);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(showTimer);
    };
  }, [demo, businesses, language, t]);

  return (
    <div
      className="notification-stack"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
          onReturnHome={() => handleReturnHome(toast.id)}
          language={language}
          t={t}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose, onReturnHome, t }) {
  const onCloseRef = useRef(onClose);
  const onReturnHomeRef = useRef(onReturnHome);
  onCloseRef.current = onClose;
  onReturnHomeRef.current = onReturnHome;

  useEffect(() => {
    if (!toast.duration) return undefined;

    const timer = setTimeout(() => {
      if (toast.autoReturnHome) {
        onReturnHomeRef.current();
      } else {
        onCloseRef.current();
      }
    }, toast.duration);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.duration, toast.autoReturnHome]);

  const typeClass =
    toast.type === "success"
      ? "toast-success"
      : toast.type === "error"
      ? "toast-error"
      : "toast-live";

  return (
    <aside
      className={`toast-item ${typeClass} ${
        toast.isExiting ? "toast-exiting" : "toast-entering"
      }`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      {/* Toast Type Icon */}
      {toast.type === "success" && (
        <div className="toast-icon-wrap toast-icon-success" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      {toast.type === "error" && (
        <div className="toast-icon-wrap toast-icon-error" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      )}

      {toast.type === "live" && <span className="live-dot" />}

      {/* Toast Body Content */}
      <div className="toast-body">
        {toast.title && <strong className="toast-title">{toast.title}</strong>}
        <p className="toast-message">{toast.message}</p>
      </div>

      {/* Close button */}
      <button
        type="button"
        className="toast-close"
        aria-label={t("form.close") || "Close"}
        onClick={onClose}
      >
        ×
      </button>

      {/* Live duration progress line */}
      {toast.duration && (
        <div className="toast-progress-track">
          <div
            className="toast-progress-bar"
            style={{ animationDuration: `${toast.duration}ms` }}
          />
        </div>
      )}
    </aside>
  );
}
