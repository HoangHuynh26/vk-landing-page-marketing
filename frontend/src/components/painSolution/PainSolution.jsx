import "./PainSolution.css";
import { useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function PainSolution() {
  const { t } = useLanguage();
  const cards = t("pain.cards");
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const cards = [...grid.querySelectorAll(".pain-card")];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        cards.forEach((card) => card.classList.add("is-revealed"));
        observer.unobserve(grid);
      },
      { threshold: 0.2 },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, [cards]);

  function handlePointerMove(event) {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = (x / bounds.width - 0.5) * 10;
    const rotateX = (y / bounds.height - 0.5) * -10;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  }

  function resetPointer(event) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return (
    <section className="pain-solution page-shell" aria-labelledby="pain-title">
      <h2 id="pain-title">
        {t("pain.title")}
        <br />
        <em>{t("pain.emphasis")}</em>
      </h2>
      <div className="pain-grid" ref={gridRef}>
        {cards.map((card, index) => (
          <article
            className="pain-card"
            style={{ "--card-index": index }}
            key={card.title}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <span className="card-number">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p className="pain-text">{card.pain}</p>
            <div>
              <b>{t("nav.online")}</b>
              <p>{card.online}</p>
            </div>
            <div>
              <b>{t("nav.offline")}</b>
              <p>{card.offline}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
