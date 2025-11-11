"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client"; // your fetch wrapper

export default function CoachChat({ userId }: { userId: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await apiClient("/coach-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // MUST include
        body: JSON.stringify({ userId, message: input }),
      });

      // Add AI/Coach reply
      setMessages((prev) => [...prev, { role: "ai", content: res.reply }]);
      setInput("");
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 max-w-lg mx-auto">
      <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your coach..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
