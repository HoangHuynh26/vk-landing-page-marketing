import { useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./Testimonial.css";

const IMAGE_WIDTH = 390;
const IMAGE_HEIGHT = 340;
const SPACING = 3;
const SPEED = 2.4;
const TILT = -7;
const PERSPECTIVE = 2600;

export default function Testimonial() {
  const { t } = useLanguage();
  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const pausedRef = useRef(false);

  const translatedReviews = t("testimonials.items");
  const reviews = Array.isArray(translatedReviews) ? translatedReviews : [];

  const count = reviews.length;
  const angle = 360 / count;
  const radius = (IMAGE_WIDTH * (1 + SPACING * 0.15)) / (2 * Math.tan(Math.PI / count));
  const degreesPerSecond = SPEED * 6;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyRotation = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotationRef.current}deg)`;
    };

    const draw = (now) => {
      const deltaTime = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = now;
      const frameDelta = Math.min(deltaTime, 0.1);
      const drag = dragRef.current;

      if (!drag.active && !pausedRef.current && !reducedMotion) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current * frameDelta;
          velocityRef.current *= 0.94;
        } else {
          rotationRef.current += degreesPerSecond * frameDelta;
        }
      }

      applyRotation();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [degreesPerSecond, radius]);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { active: true, x: event.clientX };
    velocityRef.current = 0;
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const distance = event.clientX - drag.x;
    drag.x = event.clientX;
    const rotationDelta = distance * 1.5;
    rotationRef.current += rotationDelta;
    velocityRef.current = rotationDelta * 60;
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current.active = false;
  };

  return (
    <section className="round-testimonials" aria-labelledby="testimonials-title">
      <div className="round-testimonials-heading">
        <p>{t("testimonials.eyebrow")}</p>
        <h2 id="testimonials-title">{t("testimonials.title")}</h2>
        <span>{t("testimonials.subtitle")}</span>
      </div>

      <div
        className="round-testimonials-viewport"
        style={{ perspective: `${PERSPECTIVE}px` }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="application"
        aria-label={t("testimonials.carouselLabel")}
      >
        <div
          className="round-testimonials-tilt"
          style={{ transform: `rotateX(${TILT}deg)` }}
        >
          <div
            ref={ringRef}
            className="round-testimonials-ring"
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
          >
            {reviews.map((review, index) => (
              <article
                className="round-testimonial-face"
                key={`${review.name}-${index}`}
                style={{ transform: `rotateY(${index * angle}deg) translateZ(${radius}px)` }}
              >
                <div
                  className="round-testimonial-card"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(23,58,52,0.06), rgba(23,58,52,0.94)), url(${review.avatar})` }}
                >
                  <div className="round-testimonial-card-content">
                    <img src={review.avatar} alt="" loading="lazy" />
                    <span className="round-testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </span>
                    <p>“{review.text}”</p>
                    <strong>{review.name}</strong>
                    <small>{review.timestamp}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className="round-testimonials-hint">{t("testimonials.dragHint")}</p>
    </section>
  );
}
