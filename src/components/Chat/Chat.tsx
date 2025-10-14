"use client";

import { useState, useRef, useEffect } from "react";

import { IniciativaState } from "@/types/iniciativa";
import { sendPrompt } from "@/services/sendPrompt";

interface ChatProps {
  state: IniciativaState | null;
  setState: (state: IniciativaState) => void;
}

export default function Chat({ state, setState }: ChatProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [state?.mensajes]);

  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const response = await sendPrompt(input, state);
      setState(response);
      setInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="h-full pt-8 pb-8 pl-3 pr-3 bg-gray-100">
    <div className="flex flex-col w-full h-full border-l bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {!state?.mensajes?.length && (
          <p className="text-gray-400 text-center mt-10">
            Hola, soy tu asistente. Cuéntame sobre tu iniciativa.
          </p>

        )}
        {state?.mensajes?.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] ${
                msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t flex gap-2">
        <textarea
    className="flex-1 p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
    placeholder="Escribe tu mensaje..."
    value={input}
    rows={1}
    onChange={(e) => {
      setInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }}
  />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl disabled:bg-gray-300"
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
    </div>
  );
}
