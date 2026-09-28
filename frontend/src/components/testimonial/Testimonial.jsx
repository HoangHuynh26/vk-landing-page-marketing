import { useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./Testimonial.css";

const IMAGE_WIDTH = 370;
const IMAGE_HEIGHT = 290;
const SPACING = 3;
const SPEED = 2.2; // Tốc độ quay tự động (~4.8 độ/giây) cho chuyển động mượt mà, sống động
const HOVER_SPEED = 0.8; // Tốc độ chậm lại khi rê chuột vào để người dùng dễ đọc
const DRAG_SENSITIVITY = 0.14; // Độ nhạy cảm ứng 1:1 trực quan, mượt mà khi rê/kéo chuột
const TILT = -7;
const PERSPECTIVE = 2600;

export default function Testimonial() {
  const { t } = useLanguage();
  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragRef = useRef({ active: false, lastX: 0, lastTime: 0 });
  const pausedRef = useRef(false);

  const translatedReviews = t("testimonials.items");
  const reviews = Array.isArray(translatedReviews) ? translatedReviews : [];

  const count = reviews.length;
  const angle = 360 / count;
  const radius = (IMAGE_WIDTH * (1 + SPACING * 0.15)) / (2 * Math.tan(Math.PI / count));
  const degreesPerSecond = SPEED * 2.2;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyRotation = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotationRef.current}deg)`;
    };

    let isSectionVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
      },
      { rootMargin: "150px 0px" },
    );
    observer.observe(ring);

    const draw = (now) => {
      const deltaTime = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = now;
      const frameDelta = Math.min(deltaTime, 0.1);
      const drag = dragRef.current;

      if (isSectionVisible && !reducedMotion) {
        if (drag.active) {
          // Trong lúc giữ chuột kéo: cập nhật góc quay liên tục từng frame siêu mượt
          applyRotation();
        } else {
          // Sau khi nhả chuột: giảm tốc theo quán tính tự nhiên
          if (Math.abs(velocityRef.current) > 0.02) {
            rotationRef.current += velocityRef.current * frameDelta;
            velocityRef.current *= Math.pow(0.88, frameDelta * 60);
          } else {
            const currentSpeed = pausedRef.current ? HOVER_SPEED : degreesPerSecond;
            rotationRef.current += currentSpeed * frameDelta;
          }
          applyRotation();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [degreesPerSecond, radius]);

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch (e) {}
    dragRef.current = {
      active: true,
      lastX: event.clientX,
      lastTime: performance.now(),
    };
    velocityRef.current = 0;
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const now = performance.now();
    const distance = event.clientX - drag.lastX;
    const dt = Math.max((now - drag.lastTime) / 1000, 0.001);

    drag.lastX = event.clientX;
    drag.lastTime = now;

    // Cập nhật góc quay theo độ nhạy mượt mà
    const rotationDelta = distance * DRAG_SENSITIVITY;
    rotationRef.current += rotationDelta;

    // Tính toán vận tốc quán tính khi nhả chuột
    const instantVelocity = rotationDelta / dt;
    velocityRef.current = velocityRef.current * 0.3 + instantVelocity * 0.7;
  };

  const handlePointerUp = (event) => {
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch (e) {}
    dragRef.current.active = false;
    // Giới hạn vận tốc quán tính tối đa để không quay quá nhanh
    velocityRef.current = Math.max(-120, Math.min(120, velocityRef.current));
  };

  return (
    <section className="round-testimonials" aria-labelledby="testimonials-title">
      <div className="round-testimonials-heading">
        <p>{t("testimonials.eyebrow")}</p>
        <h2 id="testimonials-title">{t("testimonials.title")}</h2>
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
                  draggable={false}
                >
                  <div className="round-testimonial-header">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="round-testimonial-avatar"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span className="round-testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </span>
                  </div>

                  <div className="round-testimonial-body">
                    <p className="round-testimonial-quote">“{review.text}”</p>
                  </div>

                  <div className="round-testimonial-footer">
                    <strong className="round-testimonial-name">{review.name}</strong>
                    <small className="round-testimonial-salon">{review.timestamp}</small>
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