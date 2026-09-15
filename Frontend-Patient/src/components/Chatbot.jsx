import React, { useEffect, useRef, useState } from "react";
import { IoChatbubblesOutline, IoClose, IoSend } from "react-icons/io5";

const quickQuestions = [
  "How do I book an appointment?",
  "What departments do you have?",
  "How do I register?",
];

const faqAnswers = [
  {
    keywords: ["appointment", "book", "booking", "doctor", "visit"],
    answer:
      "You can book an appointment from the Appointment page. Choose your department and doctor, enter your details, then select Get Appointment.",
  },
  {
    keywords: ["department", "departments", "specialty", "specialties", "services"],
    answer:
      "We offer Pediatrics, Orthopedics, Cardiology, Neurology, Oncology, Radiology, Physical Therapy, Dermatology, and ENT.",
  },
  {
    keywords: ["register", "registration", "signup", "sign up", "account"],
    answer:
      "Select Login in the top navigation, then choose Create an account. Complete the registration form to create your patient profile.",
  },
  {
    keywords: ["login", "log in", "password", "sign in"],
    answer:
      "Use your registered email and password on the Login page. If you are new here, choose Create an account first.",
  },
  {
    keywords: ["contact", "phone", "email", "reach", "support"],
    answer:
      "You can reach Hope Healthcare at 999-999-9999 or hopehealthcare@gmail.com. Our location is Kerala, India.",
  },
  {
    keywords: ["hello", "hi", "hey", "help"],
    answer:
      "Hello. I can help with appointments, departments, registration, login, and contact details.",
  },
];

const getAnswer = (question) => {
  const normalizedQuestion = question.toLowerCase();
  const matchedFaq = faqAnswers.find((faq) =>
    faq.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  return (
    matchedFaq?.answer ||
    "I can help with appointments, departments, registration, login, and contact details. Try one of the quick questions below."
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi, I am Hope Assist. What can I help you find today?",
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = (nextQuestion) => {
    const trimmedQuestion = nextQuestion.trim();
    if (!trimmedQuestion) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), sender: "user", text: trimmedQuestion },
      { id: Date.now() + 1, sender: "bot", text: getAnswer(trimmedQuestion) },
    ]);
    setQuestion("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(question);
  };

  return (
    <div className={`chatbot ${isOpen ? "chatbot-open" : ""}`}>
      {isOpen && (
        <section className="chatbot-panel" aria-label="Hope Assist FAQ chatbot">
          <header className="chatbot-header">
            <div>
              <span className="chatbot-status">● Online</span>
              <h2>Hope Assist</h2>
              <p>Quick answers for your care journey</p>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Hope Assist"
            >
              <IoClose />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div className={`chatbot-message ${message.sender}`} key={message.id}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-questions">
            {quickQuestions.map((quickQuestion) => (
              <button
                type="button"
                key={quickQuestion}
                onClick={() => askQuestion(quickQuestion)}
              >
                {quickQuestion}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question..."
              aria-label="Ask Hope Assist a question"
            />
            <button type="submit" aria-label="Send question">
              <IoSend />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label={isOpen ? "Close Hope Assist" : "Open Hope Assist"}
      >
        {isOpen ? <IoClose /> : <IoChatbubblesOutline />}
        {!isOpen && <span>Need help?</span>}
      </button>
    </div>
  );
};

export default Chatbot;
