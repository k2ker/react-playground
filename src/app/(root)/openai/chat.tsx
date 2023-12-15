"use client";

import { useChat } from "ai/react";
import { useState } from "react";
// /{ handler }: { handler: any }
export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const getAIResponse = async (prompt?: string) => {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ role: "user", content: prompt }]),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    // console.log(res.result);
    return res;
  };

  const handleClickButton = async () => {
    try {
      const aiResponse = await getAIResponse(prompt);
      console.log(aiResponse);
      // setResponse(aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.role === "user" ? m.content : m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          placeholder="What is the weather in New York?"
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleClickButton}>BUTTON</button>
    </div>
  );
}
