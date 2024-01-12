"use client";
import ChatCohere from "@/components/ChatCohere";
import ChatGemini from "@/components/ChatGemini";
import { useModelContext } from "@/context/ModelContext";

export default function ChatSession() {
  const { model } = useModelContext();
  switch (model) {
    case "Gemini Pro":
      return <ChatGemini />;
    case "Cohere AI":
      return <ChatCohere />;
    default:
      return <ChatGemini />;
  }
}
