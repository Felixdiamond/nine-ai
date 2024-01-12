import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  GoogleGenerativeAIStream,
  Message,
  StreamingTextResponse,
  CohereStream,
} from "ai";
import { cookies } from "next/headers";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY || ""
);

export const runtime = "edge";

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  const cookieStore = cookies();
  const selectedModel = cookieStore.get("model");
  console.log(selectedModel?.value)

  let stream;

  switch (selectedModel?.value) {
    case "Gemini Pro":
      const { messages } = await req.json();
      const geminiStream = await genAI
        .getGenerativeModel({ model: "gemini-pro" })
        .generateContentStream(buildGoogleGenAIPrompt(messages));

      stream = GoogleGenerativeAIStream(geminiStream);

      return new StreamingTextResponse(stream);
      break;

    case "Cohere AI":
      const { prompt } = await req.json();

      const body = JSON.stringify({
        prompt,
        model: "command-nightly",
        max_tokens: 300,
        stop_sequences: [],
        temperature: 0.9,
        return_likelihoods: "NONE",
        stream: true,
      });
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        },
        body,
      });

      // Check for errors
      if (!response.ok) {
        return new Response(await response.text(), {
          status: response.status,
        });
      }

      // Extract the text response from the Cohere stream
      stream = CohereStream(response);

      // Respond with the stream
      return new StreamingTextResponse(stream);

    default:
      break;
  }
}
