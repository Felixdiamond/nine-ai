"use client";

import { useModelContext } from "@/context/ModelContext";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const allOptions = ["Gemini Pro", "GPT-3.5", "GPT-4", "Claude AI", "Cohere AI"];
  const { model, setModel } = useModelContext();

  function handleModelChange(option) {
    Cookies.set("model", option);
    setModel(option);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {model}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {allOptions
              .filter((option) => option !== model)
              .map((option, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    handleModelChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
