import { useEffect, useRef, useState } from "react";
import { getBotResponse } from "./chatbotProvider";
import "./Chatbot.css";
import { useLanguage } from "../../i18n/LanguageContext";

function renderFormattedText(text) {
  if (!text || typeof text !== "string") return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      const isContactVal =
        inner.includes("@") || inner.includes("+61") || /\d{3}/.test(inner);
      return (
        <strong
          key={i}
          className={isContactVal ? "chat-nowrap-strong" : undefined}
        >
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export default function Chatbot() {
  const { language, t } = useLanguage();
  const rawPrompts = t("chatbot.prompts");
  const promptList =
    Array.isArray(rawPrompts) && rawPrompts.length > 0
      ? rawPrompts
      : [
        t("chatbot.inactivity") ||
        "Hello! I see you're viewing the landing page; let me know if you have any questions.",
      ];
  const scenarios = t("chatbot.scenarios");
  const [open, setOpen] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [inputError, setInputError] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyIds, setReplyIds] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const inactivityTimer = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const hasPrompted = useRef(false);

  useEffect(() => {
    const triggerPrompt = () => {
      if (hasPrompted.current) return;
      hasPrompted.current = true;
      setPromptVisible(true);
    };

    // Auto-reveal the notification prompt after 4 seconds to catch the viewer's eye
    const initialTimer = window.setTimeout(triggerPrompt, 4000);

    const resetTimer = () => {
      if (hasPrompted.current) return;
      window.clearTimeout(inactivityTimer.current);
      inactivityTimer.current = window.setTimeout(triggerPrompt, 8000);
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );
    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(inactivityTimer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  // Cycle through messages while prompt notification is visible and chat is not open
  useEffect(() => {
    if (!promptVisible || open || promptList.length <= 1) return;

    const interval = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % promptList.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [promptVisible, open, promptList.length]);

  useEffect(() => {
    setMessages([]);
    setReplyIds(null);
    setFollowUps([]);
    setQuestion("");
  }, [language]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, followUps, replyIds, open]);

  function openChat() {
    setOpen(true);
    setPromptVisible(false);
  }
  function handleFollowUp(id) {
    if (id === "form") {
      window.dispatchEvent(new CustomEvent("open-lead-form"));
      return;
    }
    if (id === "other") {
      setMessages((current) => [
        ...current,
        { from: "user", text: t("chatbot.other") },
        {
          from: "bot",
          text:
            t("chatbot.selectTopic") ||
            (language === "vi"
              ? "Dưới đây là một số chủ đề thường gặp, anh/chị hãy chọn chủ đề quan tâm nhé:"
              : "Here are our frequently asked topics, please select one to explore:"),
        },
      ]);
      setReplyIds(null);
      setFollowUps([]);
      return;
    }
    handleScenario(id);
  }

  function handleScenario(id) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) return;
    const isContact =
      id === "contact" || id === "contact_direct" ||
      scenario.answer.includes("@") ||
      scenario.answer.includes("+61");
    setMessages((current) => [
      ...current,
      { from: "user", text: scenario.question },
      { from: "bot", text: scenario.answer, isContact },
    ]);
    setReplyIds([]);
    setFollowUps(scenario.followUps);
    if (id === "other") window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = question.trim();
    if (!text) {
      setInputError(t("chatbot.emptyQuestion"));
      inputRef.current?.focus();
      return;
    }
    setInputError("");
    const botResult = getBotResponse(text, t("chatbot.answers"));
    const botText = typeof botResult === "string" ? botResult : botResult.text;
    const isFallback = typeof botResult === "object" ? botResult.isFallback : false;
    const isContact =
      (typeof botResult === "object" && (botResult.key === "contact" || botResult.key === "contact_direct")) ||
      botText.includes("+61") ||
      botText.includes("@");

    setMessages((current) => [
      ...current,
      { from: "user", text },
      { from: "bot", text: botText, isContact },
    ]);

    if (isFallback) {
      // Question not covered: display quick-reply FAQ options to guide what to ask next
      setReplyIds(null);
      setFollowUps([
        { id: "form", label: t("chatbot.form") },
      ]);
    } else {
      // Question covered: show form CTA and option to explore other topics
      setReplyIds([]);
      setFollowUps([
        { id: "form", label: t("chatbot.form") },
        { id: "other", label: t("chatbot.other") },
      ]);
    }
    setQuestion("");
  }

  const visibleReplies =
    replyIds === null
      ? scenarios
      : scenarios.filter((scenario) => replyIds.includes(scenario.id));
  return (
    <div className="chatbot">
      <button
        className="chat-launcher"
        type="button"
        onClick={openChat}
        aria-label={t("chatbot.launcher")}
        aria-expanded={open}
      >
        <img
          src={`${process.env.PUBLIC_URL}/robot.png`}
          alt=""
          className="chat-launcher-img"
          aria-hidden="true"
        />
      </button>
      {promptVisible && !open && (
        <div
          className="chat-prompt"
          role="button"
          tabIndex={0}
          onClick={openChat}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openChat();
            }
          }}
          aria-label={t("chatbot.launcher")}
        >
          <button
            type="button"
            className="chat-prompt-close"
            onClick={(event) => {
              event.stopPropagation();
              setPromptVisible(false);
            }}
            aria-label={t("chatbot.closePrompt") || "Close notification"}
          >
            ×
          </button>

          <p className="chat-prompt-text" key={promptIndex}>
            {promptList[promptIndex % promptList.length]}
          </p>
        </div>
      )}
      {open && (
        <section className="chat-panel" aria-label={t("chatbot.launcher")}>
          <header>
            <div className="chat-header-brand">
              <img
                src={`${process.env.PUBLIC_URL}/robot.png`}
                alt=""
                className="chat-header-avatar"
                aria-hidden="true"
              />
              <div>
                <strong>VK Digital Hub</strong>
                <small>{t("chatbot.support")}</small>
              </div>
            </div>
            <button
              type="button"
              aria-label={t("chatbot.close")}
              onClick={() => setOpen(false)}
            >
              −
            </button>
          </header>
          <div className="chat-quick-contact-bar">
            <a href="tel:+61431679731" className="chat-quick-contact-link">
              <span aria-hidden="true">📞</span> +61 431 679 731
            </a>
            <span className="chat-quick-contact-sep">·</span>
            <a href="mailto:admin@vkdigitalhub.com.au" className="chat-quick-contact-link">
              <span aria-hidden="true">✉️</span> Email
            </a>
          </div>
          <div className="chat-messages" aria-live="polite">
            <p className="bot-message">{renderFormattedText(t("chatbot.welcome"))}</p>
            {messages.map((message, index) => (
              <div
                className={`${message.from}-message-wrapper`}
                key={`${message.from}-${index}`}
              >
                <p className={`${message.from}-message`}>
                  {renderFormattedText(message.text)}
                </p>
                {message.isContact && (
                  <div className="chat-contact-card">
                    <a
                      href="tel:+61431679731"
                      className="chat-contact-row"
                      aria-label="Call +61 431 679 731"
                    >
                      <span className="chat-contact-icon" aria-hidden="true">
                        📞
                      </span>
                      <div className="chat-contact-meta">
                        <span className="chat-contact-label">
                          {language === "vi" ? "Phone / Hotline" : "Phone / Hotline"}
                        </span>
                        <span className="chat-contact-value">
                          <strong>+61 431 679 731</strong>
                        </span>
                      </div>
                      <span className="chat-contact-action-badge">
                        {language === "vi" ? "Gọi ngay" : "Call"}
                      </span>
                    </a>
                    <div className="chat-contact-divider" aria-hidden="true" />
                    <a
                      href="mailto:admin@vkdigitalhub.com.au"
                      className="chat-contact-row"
                      aria-label="Email admin@vkdigitalhub.com.au"
                    >
                      <span className="chat-contact-icon" aria-hidden="true">
                        ✉️
                      </span>
                      <div className="chat-contact-meta">
                        <span className="chat-contact-label">
                          {language === "vi" ? "Email hỗ trợ" : "Support Email"}
                        </span>
                        <span className="chat-contact-value">
                          <strong>admin@vkdigitalhub.com.au</strong>
                        </span>
                      </div>
                      <span className="chat-contact-action-badge">
                        {language === "vi" ? "Gửi mail" : "Email"}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            ))}
            {visibleReplies.length > 0 && (
              <div
                className="chat-quick-replies"
                aria-label={t("chatbot.support")}
              >
                {visibleReplies.map((scenario) => (
                  <button
                    type="button"
                    className={`chat-quick-reply ${scenario.id === "free" ? "chat-quick-reply-primary" : ""}`}
                    key={scenario.id}
                    onClick={() => handleScenario(scenario.id)}
                  >
                    <span className="cqr-border cqr-top" aria-hidden="true" />
                    <span className="cqr-border cqr-right" aria-hidden="true" />
                    <span className="cqr-border cqr-bottom" aria-hidden="true" />
                    <span className="cqr-border cqr-left" aria-hidden="true" />
                    <span className="chat-quick-reply-text">{scenario.label}</span>
                  </button>
                ))}
              </div>
            )}
            {followUps.length > 0 && (
              <div
                className="chat-follow-ups"
                aria-label={t("chatbot.support")}
              >
                {followUps.map((followUp) =>
                  followUp.id === "form" ? (
                    <button
                      type="button"
                      className="chat-form-box"
                      key={followUp.id}
                      onClick={() => handleFollowUp(followUp.id)}
                    >
                      <span className="chat-form-box-badge">
                        <span className="chat-form-box-dot" aria-hidden="true" />
                        {t("chatbot.formBadge") ||
                          (language === "vi"
                            ? "BẢN ĐÁNH GIÁ MIỄN PHÍ"
                            : "FREE ASSESSMENT")}
                      </span>
                      <div className="chat-form-box-body">
                        <span className="chat-form-box-icon" aria-hidden="true">
                          📋
                        </span>
                        <div className="chat-form-box-info">
                          <strong className="chat-form-box-title">
                            {followUp.label}
                          </strong>
                          <span className="chat-form-box-desc">
                            {t("chatbot.formSub") ||
                              (language === "vi"
                                ? "Chỉ mất 2 phút · Miễn phí & Không cam kết"
                                : "Takes 2 mins · Free & No commitment")}
                          </span>
                        </div>
                        <div className="chat-form-box-action">
                          <span className="chat-form-box-btn-text">
                            {t("chatbot.formAction") ||
                              (language === "vi" ? "Bấm để điền" : "Click to open")}
                          </span>
                          <span className="chat-form-box-arrow" aria-hidden="true">
                            ➔
                          </span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="chat-quick-reply"
                      key={followUp.id}
                      onClick={() => handleFollowUp(followUp.id)}
                    >
                      <span className="cqr-border cqr-top" aria-hidden="true" />
                      <span className="cqr-border cqr-right" aria-hidden="true" />
                      <span className="cqr-border cqr-bottom" aria-hidden="true" />
                      <span className="cqr-border cqr-left" aria-hidden="true" />
                      <span className="chat-quick-reply-text">{followUp.label}</span>
                    </button>
                  ),
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage}>
            <label htmlFor="chat-question" className="sr-only">
              {t("chatbot.placeholder")}
            </label>
            <input
              ref={inputRef}
              id="chat-question"
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
                if (inputError) setInputError("");
              }}
              placeholder={t("chatbot.placeholder")}
              autoComplete="off"
            />
            <button type="submit" aria-label={t("chatbot.send")}>
              →
            </button>
          </form>
          {inputError && (
            <p className="chat-input-error" role="alert">
              {inputError}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
