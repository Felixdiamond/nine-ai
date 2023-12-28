"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY;
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const genAI = new GoogleGenerativeAI(apiKey);
  const [isLoading, setIsLoading] = useState(false);
  // async function chat(prompt: string) {
  //   setIsLoading(true);
  //   document.removeEventListener("keydown", (e) => {
  //     if (e.key === "Enter") {
  //       chat(message);
  //     }
  //   });
  //   // For text-only input, use the gemini-pro model
  //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  //   const result = await model.generateContent(prompt);
  //   const response = await result.response;
  //   const text = response.text();
  //   console.log(text);
  //   setIsLoading(false);
  //   setMessage("");
  //   document.addEventListener("keydown", (e) => {
  //     if (e.key === "Enter") {
  //       chat(message);
  //     }
  //   });
  // }

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     chat(message);
  //   }
  // });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex items-center w-1/2 lg:w-2/5">
        <Textarea
          className="border-none pt-3 pb-3 w-full h-full resize-none overflow-auto"
          placeholder="Type your message"
          contentEditable={true}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={(e) => {
            // e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          style={{ height: "1em", maxHeight: "50vh" }}
        />

        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-black absolute right-0 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0
                  12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                  3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <Send
            size={24}
            // onClick={() => chat(message)}
            className="absolute right-0 mr-1"
          />
        )}
      </div>
    </div>
  );
}
