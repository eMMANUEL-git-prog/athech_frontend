"use client";
import { useState } from "react";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

type AthleteType = "sprinter" | "middle-distance" | "marathoner";

export default function AiChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "diet">("chat");
  const [athleteType, setAthleteType] = useState<AthleteType | "">("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const role = "athlete";

  const sendMessage = async () => {
    if (mode === "diet" && !athleteType) {
      alert("Select athlete type first");
      return;
    }

    const userMsg: Message = { role: "user", text: input || "Generate diet" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          mode,
          role,
          athleteType: athleteType || null,
        }),
      });

      const data = await res.json();

      if (data.pdfUrl) {
        setPdfUrl(data.pdfUrl);
      }

      const botMsg: Message = {
        role: "bot",
        text: data.reply || data.dietText,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button with pulse animation */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
        aria-label="AI Chat"
      >
        <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Chat Window */}
          <div className="fixed bottom-24 right-6 w-[420px] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="relative p-5 bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-green-100 text-xs">
                      Always here to help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMode("chat");
                    setPdfUrl(null);
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    mode === "chat"
                      ? "bg-white text-green-700 shadow-lg"
                      : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => {
                    setMode("diet");
                    setPdfUrl(null);
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    mode === "diet"
                      ? "bg-white text-green-700 shadow-lg"
                      : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                  }`}
                >
                  Generate Diet
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto max-h-[450px] space-y-3 bg-gradient-to-b from-gray-50 to-white">
              {mode === "diet" && (
                <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Select Athlete Type
                  </label>
                  <select
                    value={athleteType}
                    onChange={(e) =>
                      setAthleteType(e.target.value as AthleteType)
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50"
                  >
                    <option value="">-- Choose athlete type --</option>
                    <option value="sprinter">🏃‍♂️ Sprinter</option>
                    <option value="middle-distance">🏃 Middle Distance</option>
                    <option value="marathoner">🏃‍♀️ Marathoner</option>
                  </select>
                </div>
              )}

              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Start a conversation
                  </h4>
                  <p className="text-sm text-gray-500">
                    Ask me anything or generate a personalized diet plan
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {pdfUrl && (
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-sm">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors"
                  >
                    <span className="text-2xl">📄</span>
                    <span>Download Diet PDF</span>
                  </a>
                </div>
              )}

              {loading && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2">
                  <div className="bg-white text-gray-500 p-3.5 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !loading && sendMessage()
                  }
                  placeholder={
                    mode === "diet"
                      ? "Ask about diet tips..."
                      : "Type your message..."
                  }
                  className="flex-1 p-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
                  disabled={loading}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
