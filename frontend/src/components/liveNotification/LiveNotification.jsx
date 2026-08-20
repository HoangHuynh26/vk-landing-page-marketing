import { useEffect, useState } from "react";
import "./LiveNotification.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function LiveNotification({ demo = true, message }) {
  const { language, t } = useLanguage();
  const [phase, setPhase] = useState("hidden");
  const [businessIndex, setBusinessIndex] = useState(0);
  const businesses =
    language === "vi"
      ? ["Nail Studio Joondalup", "Luna Nails Perth", "Glow Spa Melbourne"]
      : ["Joondalup Nail Studio", "Luna Nails Perth", "Glow Spa Melbourne"];

  useEffect(() => {
    let showTimer;
    let visibleTimer;
    let exitTimer;
    let nextTimer;

    const scheduleNotification = () => {
      showTimer = window.setTimeout(() => {
        setBusinessIndex((index) => (index + 1) % businesses.length);
        setPhase("entering");
        visibleTimer = window.setTimeout(() => {
          setPhase("visible");
          exitTimer = window.setTimeout(() => {
            setPhase("exiting");
            nextTimer = window.setTimeout(() => {
              setPhase("hidden");
              scheduleNotification();
            }, 500);
          }, 10000);
        }, 500);
      }, 15000);
    };

    scheduleNotification();
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(visibleTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(nextTimer);
    };
  }, [businesses.length]);

  if (phase === "hidden") return null;
  const businessName = businesses[businessIndex];
  const localizedMessage =
    language === "vi"
      ? `${businessName} vừa nhận bản đánh giá marketing miễn phí.`
      : `${businessName} just received a free marketing review.`;
  return (
    <aside
      className={`live-notification live-notification-${phase}`}
      role="status"
    >
      <span className="live-dot" />
      <div>
        <p>{message || localizedMessage}</p>
      </div>
      <button
        type="button"
        aria-label={t("notification.close")}
        onClick={() => setPhase("exiting")}
      >
        ×
      </button>
    </aside>
  );
}
