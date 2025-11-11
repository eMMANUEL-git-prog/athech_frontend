"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";

export default function CoachChat({ userId }: { userId: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await apiClient("/coach-chat", "POST", {
        userId,
        message: input,
      });

      // Add AI reply
      setMessages((prev) => [...prev, { role: "ai", content: res.reply }]);
      setInput("");
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error: Failed to send message." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 max-w-lg mx-auto">
      {/* Chat messages */}
      <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-green-100 text-green-800 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input box */}
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
