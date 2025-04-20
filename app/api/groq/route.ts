import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { userInput } = await req.json();

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", 
          content: `You are a ecommerece platform search 
                    autocomplete bot give me 5 items related to the user input 
                    and also no need for any explanation and things like
                    here are 5 itesm related to ${userInput}
                    also always give answers like
                    something
                    something 
                    like that only neeeded no need for the numbers also.` },
        { role: "user", content: userInput },
      ],
      model: "llama3-70b-8192",
    });

    return NextResponse.json({ result: completion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
