import GlowButton from "../CTA/GlowButton";
import Loading from "../loading/Loading";
import "./Hero.css";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  return (
    <section className="hero" aria-labelledby="hero-title">
      {isVideoLoading && <Loading />}
      <video
        className="hero-video"
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={() => setIsVideoLoading(false)}
        onError={() => setIsVideoLoading(false)}
      />
      <div className="hero-overlay" />
      <div className="page-shell hero-content">
        <h1 id="hero-title" style={{widt:"100%"}}>
          {t("hero.title")} <em>{t("hero.emphasis")}</em>{" "}
          <span className="hero-guarantee">{t("hero.copy")}</span>
        </h1>
        <p className="hero-subcopy">{t("hero.subcopy")}</p>
        <div className="hero-actions">
          <GlowButton />
          <span>
            {t("hero.noCost")} {t("hero.formTime")}
          </span>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        ↓
      </div>
    </section>
  );
}
