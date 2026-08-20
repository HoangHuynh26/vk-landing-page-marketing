import { useEffect, useRef, useState } from "react";
import { getBotResponse } from "./chatbotProvider";
import "./Chatbot.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Chatbot() {
  const { language, t } = useLanguage();
  const inactivityMessage = t("chatbot.inactivity");
  const scenarios = t("chatbot.scenarios");
  const [open, setOpen] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [inputError, setInputError] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyIds, setReplyIds] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const inactivityTimer = useRef(null);
  const inputRef = useRef(null);
  const hasPrompted = useRef(false);

  useEffect(() => {
    const resetTimer = () => {
      if (hasPrompted.current) return;
      window.clearTimeout(inactivityTimer.current);
      inactivityTimer.current = window.setTimeout(() => {
        setPromptVisible(true);
        hasPrompted.current = true;
      }, 15000);
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );
    resetTimer();
    return () => {
      window.clearTimeout(inactivityTimer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    setReplyIds(null);
    setFollowUps([]);
    setQuestion("");
  }, [language]);

  function openChat() {
    setOpen(true);
    setPromptVisible(false);
  }
  function handleFollowUp(id) {
    if (id === "form") {
      document
        .getElementById("lead-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (id === "other") {
      setReplyIds([]);
      setFollowUps([]);
      window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    handleScenario(id);
  }

  function handleScenario(id) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) return;
    setMessages((current) => [
      ...current,
      { from: "user", text: scenario.question },
      { from: "bot", text: scenario.answer },
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
    setMessages((current) => [
      ...current,
      { from: "user", text },
      { from: "bot", text: getBotResponse(text, t("chatbot.answers")) },
    ]);
    setReplyIds(null);
    setFollowUps([]);
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
        <span aria-hidden="true">✦</span>
      </button>
      {promptVisible && !open && (
        <button className="chat-prompt" type="button" onClick={openChat}>
          {inactivityMessage}
        </button>
      )}
      {open && (
        <section className="chat-panel" aria-label={t("chatbot.launcher")}>
          <header>
            <div>
              <strong>VK Digital Hub</strong>
              <small>{t("chatbot.support")}</small>
            </div>
            <button
              type="button"
              aria-label={t("chatbot.close")}
              onClick={() => setOpen(false)}
            >
              −
            </button>
          </header>
          <div className="chat-messages" aria-live="polite">
            <p className="bot-message">{t("chatbot.welcome")}</p>
            {messages.map((message, index) => (
              <p
                className={`${message.from}-message`}
                key={`${message.from}-${index}`}
              >
                {message.text}
              </p>
            ))}
            {visibleReplies.length > 0 && (
              <div
                className="chat-quick-replies"
                aria-label={t("chatbot.support")}
              >
                {visibleReplies.map((scenario) => (
                  <button
                    type="button"
                    className="chat-quick-reply"
                    key={scenario.id}
                    onClick={() => handleScenario(scenario.id)}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            )}
            {followUps.length > 0 && (
              <div
                className="chat-follow-ups"
                aria-label={t("chatbot.support")}
              >
                {followUps.map((followUp) => (
                  <button
                    type="button"
                    className="chat-quick-reply"
                    key={followUp.id}
                    onClick={() => handleFollowUp(followUp.id)}
                  >
                    {followUp.label}
                  </button>
                ))}
              </div>
            )}
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
