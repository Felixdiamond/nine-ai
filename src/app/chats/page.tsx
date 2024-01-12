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
import generateRanString from "@/components/genRanString";
import { useRouter } from "next/navigation";

const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY!;


export default function ChatsDashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [firstTime, setFirstTime] = useState(0);
  const genAI = new GoogleGenerativeAI(apiKey);
  const [isLoading, setIsLoading] = useState(false);
  async function chat(prompt: string) {
    prompt = prompt.trim();
    setIsLoading(true);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    let chatId = generateRanString();
    console.log(text);
    setIsLoading(false);
    setMessage("");
    router.push(`/chats/${chatId}`);
  }

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     chat(message);
  //   }
  // });

  return (
    <div className="flex parent-div">
      <div className="w-1/5 shadow">
        <NavBar />
      </div>
      <div className="top-0 w-4/5">
        <div className="w-full h-4/5 flex flex-col justify-between items-center">
          <div className="absolute right-0 pt-2 pr-2">
            <Dropdown />
          </div>
          <div className="flex flex-col items-center hero">
            <Image width={110} height={110} src={logo} alt="logo" />
            <h2 className="text-xl font-semibold">How can i help you today?</h2>
          </div>
          <div className="w-3/5 sug-div bottom-0 h-2/5 flex flex-wrap justify-between">
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="w-full h-1/5 flex items-center justify-center">
          <div className="relative flex items-center w-1/2 lg:w-3/5">
            <Textarea
              className="border-none pt-3 pb-3 pr-7 w-full h-full resize-none overflow-auto"
              placeholder="Type your message"
              contentEditable={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={(e) => {
                let target = e.target as HTMLTextAreaElement;
                let trimmedValue = target.value.trim();
                if (trimmedValue.length === 0 || trimmedValue === "\n") {
                  target.style.height = "1em";
                  setFirstTime(0);
                } else {
                  if (firstTime < 70) {
                    target.style.height = "1em";
                    setFirstTime(firstTime + 1);
                  } else {
                    target.style.height = "auto";
                  }
                  target.style.height = target.scrollHeight + "px";
                }
              }}              
              style={{ height: "1em", maxHeight: "17vh" }}
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
                onClick={() => chat(message)}
                size={24}
                className="absolute right-0 mr-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
