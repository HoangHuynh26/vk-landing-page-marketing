import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ContactStory.css";

export default function ContactStory() {
  const { language } = useLanguage();
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openForm = (e) => {
    e?.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lead-form"));
  };

  const isVi = language === "vi";

  const messages = isVi
    ? [
        {
          id: 1,
          sender: "them",
          time: "10:24 AM",
          text: "Tôi muốn mở rộng tiệm nail của mình tại Úc, nhưng chưa biết bắt đầu từ đâu để có thêm nhiều khách mới?",
        },
        {
          id: 2,
          sender: "me",
          time: "10:25 AM",
          text: "Hãy để chúng tôi đồng hành cùng bạn! Bước đầu tiên là một bản đánh giá marketing toàn diện — phân tích thứ hạng Google Maps, website đặt lịch và đối thủ quanh tiệm hoàn toàn miễn phí.",
        },
        {
          id: 3,
          sender: "them",
          time: "10:26 AM",
          text: "Bản đánh giá này gồm những gì và có mất phí không ạ?",
        },
        {
          id: 4,
          sender: "me",
          time: "10:27 AM",
          text: "Hoàn toàn 100% miễn phí & không ràng buộc. Bạn sẽ nhận được báo cáo chi tiết 5 cơ hội vàng để tăng 30-50 lịch hẹn mới/tháng. Chỉ mất 30 giây để điền thông tin!",
        },
      ]
    : [
        {
          id: 1,
          sender: "them",
          time: "10:24 AM",
          text: "I want to grow my salon in Australia, but I'm not sure how to effectively attract high-value repeat clients?",
        },
        {
          id: 2,
          sender: "me",
          time: "10:25 AM",
          text: "We can help you get started! The first step is a comprehensive, complimentary marketing assessment — analyzing your local Google Maps visibility, online booking, and competitors.",
        },
        {
          id: 3,
          sender: "them",
          time: "10:26 AM",
          text: "What exactly is included in this free assessment?",
        },
        {
          id: 4,
          sender: "me",
          time: "10:27 AM",
          text: "It is 100% free with zero commitment. You'll receive actionable insights and a tailored roadmap to add 30-50 confirmed appointments every month. Takes just 30 seconds!",
        },
      ];

  return (
    <section
      ref={containerRef}
      className="contact-story-section"
      id="contact-assessment"
      aria-label="Contact and Free Assessment Conversation"
    >
      <div className="contact-story-header">
        <span className="contact-story-eyebrow">
          {isVi ? "KẾT NỐI & TƯ VẤN" : "CONNECT & CONSULT"}
        </span>
        <h2 className="contact-story-title">
          {isVi
            ? "Hãy để chúng tôi hiểu câu chuyện tiệm của bạn"
            : "Let Us Understand Your Salon's Story"}
        </h2>
        <p className="contact-story-sub">
          {isVi
            ? "Mỗi bước đột phá lượng khách đều bắt đầu từ một cuộc trò chuyện chân thành và thấu hiểu."
            : "Every booking breakthrough begins with an open, authentic conversation."}
        </p>
      </div>

      {/* iOS Chat Mockup */}
      <div className={`contact-ios-frame ${inView ? "is-revealed" : ""}`}>
        {/* Phone / Chat Header */}
        <div className="contact-ios-header">
          <div className="contact-ios-brand-lockup">
            <div className="contact-ios-avatar-wrap">
              <img
                src="/logo.png"
                alt="VK Digital Hub"
                className="contact-ios-avatar"
                width="38"
                height="38"
              />
              <span className="contact-ios-online-dot" aria-hidden="true" />
            </div>
            <div className="contact-ios-header-text">
              <strong className="contact-ios-brand-name">
                VK Digital Hub <span className="contact-ios-verified">✓</span>
              </strong>
              <small className="contact-ios-status">
                {isVi ? "Tư vấn viên trưởng · Trực tuyến" : "Lead Strategist · Online"}
              </small>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="contact-ios-body">
          {messages.map((msg, index) => {
            const isMe = msg.sender === "me";
            const delayStyle = {
              animationDelay: `${0.25 + index * 0.35}s`,
            };

            return (
              <div
                key={msg.id}
                className={`contact-ios-row ${isMe ? "is-me" : "is-them"} ${
                  inView ? "animate-bubble" : ""
                }`}
                style={delayStyle}
              >
                <div className="contact-ios-bubble-wrap">
                  <div className={`contact-ios-bubble ${isMe ? "bubble-me" : "bubble-them"}`}>
                    <p className="contact-ios-bubble-text">{msg.text}</p>
                  </div>
                  <span className="contact-ios-time">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator at bottom of conversation */}
          <div
            className={`contact-ios-row is-me ${inView ? "animate-bubble" : ""}`}
            style={{ animationDelay: "1.7s" }}
          >
            <div className="contact-ios-bubble bubble-me bubble-typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>

        {/* CTA & Contact Details Action Box */}
        <div
          className={`contact-ios-action-box ${inView ? "animate-action" : ""}`}
          style={{ animationDelay: "1.9s" }}
        >
          <div className="contact-ios-action-header">
            <span className="contact-ios-action-badge">
              {isVi ? "🎯 BƯỚC TIẾP THEO" : "🎯 NEXT STEP"}
            </span>
            <p className="contact-ios-action-prompt">
              {isVi
                ? "Sẵn sàng để tiệm bạn luôn kín lịch hẹn? Bấm nhận bản đánh giá miễn phí ngay hôm nay!"
                : "Ready to keep your appointment book full? Claim your free assessment today!"}
            </p>
          </div>

          <div className="contact-ios-btn-row">
            <button
              type="button"
              className="contact-ios-cta-btn"
              onClick={openForm}
            >
              <span className="contact-ios-cta-icon" aria-hidden="true">📋</span>
              <span className="contact-ios-cta-label">
                {isVi ? "Nhận bản đánh giá marketing miễn phí" : "Get Free Marketing Assessment"}
              </span>
              <span className="contact-ios-cta-arrow" aria-hidden="true">➔</span>
            </button>
          </div>

          {/* Direct phone & email row */}
          <div className="contact-ios-direct-links">
            <a href="tel:+61431679731" className="contact-direct-chip">
              <span className="direct-chip-icon" aria-hidden="true">📞</span>
              <span>Hotline: <strong>+61 431 679 731</strong></span>
            </a>
            <span className="contact-direct-divider">·</span>
            <a href="mailto:admin@vkdigitalhub.com.au" className="contact-direct-chip">
              <span className="direct-chip-icon" aria-hidden="true">✉️</span>
              <span>Email: <strong>admin@vkdigitalhub.com.au</strong></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
