'use client';
import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;
type SpeechRecognitionEvent = any;

const dummyMessages = [
  { from: "user", text: "Hi, I need help with my order." },
  { from: "agent", text: "Sure! Can you share your order ID?" },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat');
      if (saved) setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "agent", text: "Thanks! We'll check that for you." }]);
      setTyping(false);
    }, 1500);
  };

  const startVoiceInput = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onresult = (e: SpeechRecognitionEvent) => setInput(e.results[0][0].transcript);
      recognition.start();
      recognitionRef.current = recognition;
    }
  };

  const suggestions = [
    "Summarize customer's issue",
    "Suggest a reply",
    "Send refund confirmation"
  ];

  return (
    <div className="flex flex-col flex-1 border-r bg-purple-50 dark:bg-black font-poppins">
      <header className="p-5 border-b border-purple-300 dark:border-purple-800 font-bold text-xl text-purple-800 dark:text-pink-400 flex items-center justify-between">
        Live Chat <span className="text-sm bg-purple-200 text-purple-900 dark:bg-pink-700 dark:text-pink-200 px-3 py-1 rounded-full font-semibold select-none">Online</span>
      </header>
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 dark:scrollbar-thumb-pink-600 dark:scrollbar-track-black transition-colors duration-500">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-md animate-fadeInSlide
              ${msg.from === "agent" 
                ? "bg-purple-200 text-purple-900 self-start" 
                : "bg-pink-300 dark:bg-pink-700 text-black dark:text-pink-200 self-end"
              }`}
            style={{ animationDuration: `${0.3 + i * 0.1}s` }}
          >
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="self-start bg-purple-100 text-purple-700 p-2 rounded-lg animate-pulse text-sm font-semibold dark:bg-pink-800 dark:text-pink-300">
            Agent is typing...
          </div>
        )}
      </div>
      <div className="px-5 py-3 text-sm space-x-3 bg-purple-100 dark:bg-black border-t border-purple-300 dark:border-purple-800">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="bg-purple-300 dark:bg-pink-700 text-purple-900 dark:text-pink-200 px-3 py-1 rounded-full font-medium hover:bg-purple-400 dark:hover:bg-pink-600 transition"
            onClick={() => setInput(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <form className="flex p-5 border-t border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-black" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message or ask AI..."
          className="flex-1 border border-purple-300 dark:border-pink-600 rounded-full px-4 py-3 mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500 bg-white dark:bg-gray-900 text-purple-900 dark:text-pink-300 placeholder-purple-400 dark:placeholder-pink-600 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          onClick={startVoiceInput}
          className="mr-3 text-2xl hover:text-purple-600 dark:hover:text-pink-400 transition"
          aria-label="Start voice input"
        >
          🎤
        </button>
        <button
          className="px-6 py-3 bg-purple-600 dark:bg-pink-600 text-white rounded-full font-semibold hover:bg-purple-700 dark:hover:bg-pink-700 transition"
          type="submit"
        >
          Send
        </button>
      </form>

      {}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlide {
          animation-name: fadeInSlide;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      `}</style>
    </div>
  );
}
