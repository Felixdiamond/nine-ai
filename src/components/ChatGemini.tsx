"use client";

import Dropdown from "@/components/DropDown";
import NavBar from "@/components/NavBar";
import "./style.css";
import { Bot, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useChat, useCompletion } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUser } from "@clerk/clerk-react";
import "./chat.css";
import Image from "next/image";

export default function ChatGemini() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { user } = useUser();
  const router = useRouter();
  const [firstTime, setFirstTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  interface SyntheticEvent {
    preventDefault: () => void;
    currentTarget: { checkValidity: () => boolean };
  }

  const handleSend = async () => {
    setIsLoading(true);
    const syntheticEvent: SyntheticEvent = {
      preventDefault: () => {},
      currentTarget: { checkValidity: () => true },
    };
    await handleSubmit(syntheticEvent as any);
    setIsLoading(false);
  };

  return (
    <div className="flex parent-div bg-transparent">
      <div className="w-1/5 max-h-screen shadow rounded-lg box-border">
        <NavBar />
      </div>
      <div className="top-0 w-4/5 max-h-screen frostyy">
        <div className="w-full h-4/5 flex flex-col justify-between items-center">
          <div className="absolute right-0 pt-2 pr-2 z-10">
            <Dropdown />
          </div>
          <div className="opaquediv"></div>
          <div className="messagesdiv" ref={scrollRef}>
            {messages.map((m) => (
              <div key={m.id} className="mb-3">
                {m.role === "user" ? (
                  <div className="flex justify-end justify-self-end items-start right-0 max-w-3/5">
                    <span className="userdiv mr-2 rounded-lg px-3 py-2">
                      <ReactMarkdown
                        className="react-markdown"
                        remarkPlugins={[remarkGfm]}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </span>
                    <div className="min-w-11 min-h-11 w-11 h-11 mt-1">
                    <Image
                      src={user?.imageUrl}
                      width={50}
                      height={50}
                      alt="user"
                      className="lilpic"
                    />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start justify-self-start items-start left-0 w-fit max-w-3/5">
                    <div className="min-w-6 min-h-6 w-6 h-6 mt-1">
                      <Bot size={25} />
                    </div>
                    <span className="botdiv ml-2 rounded-lg p-2 flex flex-grow border border-1 border-gray-500">
                      <ReactMarkdown
                        className="react-markdown"
                        remarkPlugins={[remarkGfm]}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-1/5 flex items-center justify-center">
          <div className="relative flex items-center w-1/2 lg:w-3/5">
            <Textarea
              className="border-none pt-3 pb-3 pr-7 w-full h-full resize-none overflow-auto"
              placeholder="Type your message"
              contentEditable={true}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onInput={(e) => {
                let target = e.target as HTMLTextAreaElement;
                let trimmedValue = target.value.trim();
                if (trimmedValue.length === 0 || trimmedValue === "\n") {
                  target.style.height = "1em";
                  setFirstTime(0); // Reset firstTime when textarea is empty
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
              <form
                onSubmit={handleSend}
                className="absolute right-0 mr-1 flex items-center"
              >
                <Send size={24} className="" />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
