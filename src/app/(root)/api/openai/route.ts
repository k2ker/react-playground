// pages/api/openai.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET_KEY,
      });

      const messages = await req.json();

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // stream: true,
        messages,
      });

      return new NextResponse(response.choices[0].message.content, {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("OpenAI API request failed", {
        status: 500,
      });
    }
  } else {
    // res.status(405).json({ error: "Method not allowed" });
  }
}
