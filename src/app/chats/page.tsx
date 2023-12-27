"use client";

import Dropdown from "@/components/DropDown";
import NavBar from "@/components/NavBar";
import logo from "../../../public/logo.png";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./style.css";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY;

export default function ChatsDashboard() {
  const [message, setMessage] = useState("");
  const genAI = new GoogleGenerativeAI(apiKey);
  const [isLoading, setIsLoading] = useState(false);
  async function chat(prompt: string) {
    setIsLoading(true);
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        chat(message);
      }
    });
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setIsLoading(false);
    setMessage("");
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        chat(message);
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      chat(message);
    }
  });

  return (
    <div className="flex">
      <div className="w-1/5">
        <NavBar />
      </div>
      <div className="top-0 w-4/5">
        <div className="border-2 border-red-600 w-full h-4/5 flex flex-col justify-between items-center">
          <div className="absolute right-0 pt-2 pr-2">
            <Dropdown />
          </div>
          <div className="flex flex-col items-center mt-9">
            <Image width={120} height={120} src={logo} alt="logo" />
            <h2>How can i help you today?</h2>
          </div>
          <div className="border-2 border-red-600 w-3/5 bottom-0 h-2/5 flex flex-wrap justify-between">
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="bottom-0 border-2 border-red-600 w-full h-1/5 flex items-center justify-center">
          <div className="relative flex items-center w-1/2 lg:w-3/5">
            <Textarea
              className="border-none pt-3 pb-3 pr-7 w-full h-full resize-none overflow-auto"
              placeholder="Type your message"
              contentEditable={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={(e) => {
                // e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              style={{ height: "1em", maxHeight: "17vh" }}
            />

            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black absolute right-0 mr-1"
                onClick={() => chat(message)}
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
              <Send size={24} className="absolute right-0 mr-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
