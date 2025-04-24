import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { userInput ,task , actor, sellerdata, lang, productdata } = await req.json();

  try {
    if (!userInput || !task) {
      return NextResponse.json({ error: "Missing userInput or task" }, { status: 400 });
    }
    if (task === "chat" && actor === 'Seller') {
      console.log('The task is chat');
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", 
            content: `You are GramiAi — a smart, reliable, and concise virtual assistant for an e-commerce platform.

                      Your responsibilities:
                      - Answer only questions related to e-commerce or products.
                      - Provide helpful, accurate, and concise answers.
                      - Always keep the tone friendly and easy to understand.
                      - Limit answers to 2-3 short sentences max.

                      Allowed categories:
                      - Clothing
                      - Farming supplies
                      - Handcraft items
                      - Vegetables
                      - Grains and Pulses
                      - Seeds and Saplings
                      - Dairy Products

                      Strict rules:
                      - Do NOT answer questions related to:
                        - Technology or software development
                        - Health or wellness
                        - Politics or current events
                        - Personal advice or life advice

                      Response behavior:
                      -if question is like how are you. you can answer
                      - If a question falls outside your scope, reply with:
                        "I'm here to assist with product-related or e-commerce questions only."
                      - Do NOT generate disclaimers or explanations.
                      - Do NOT repeat the question or restate obvious facts.
                      - Avoid giving opinions — stick to facts or helpful suggestions.

                      Keep all responses minimal, user-focused, and category-specific.
                      
`+ sellerdata },
          { role: "user", content: userInput },
        ],
        model: "llama-3.1-8b-instant",
      });
      return NextResponse.json({ reply: completion.choices[0]?.message?.content || "" });
    }else if (task === "chat" && actor === "buyer") {
      const completion = await groq.chat.completions.create({
        model: "gemma2-9b-it",
        messages: [
          {
            role: "system",
            content: `

                  dont show the think prompt
                  You are GramiAi, the friendly shopping assistant for GramCart.

                  Your Responsibilities:
                  Help customers find products from the current catalog (productdata).

                  Provide links in this exact format: /product/product-name.

                  Respond based on whether the product exists exactly in the list.

                  Logic:
                  If the user asks for a specific product:

                  Check for the item in productdata if it matches any show its details.

                  ✅ If found:
                  Show only the product name and link.
                  no other items should be included.
                  only items inside the productlist should be shown
                  Example:
                  Stone-Ground Wheat Flour – <a href="/product/Stone-Ground Wheat Flour">View Product</a>

                  ❌ If not found:
                  Respond with:
                  Sorry, that product is out of stock.

                  If the user asks something general (like “show me spices”):

                  Return 2–3 relevant products.

                  Format: title, 1-line benefit (optional), and link.

                  Example:
                  Sure! You might like:

                  Organic Turmeric Powder – <a href="/product/Organic Turmeric Powder">View Product</a>

                  Whole Cumin Seeds – <a href="/product/Whole Cumin Seeds">View Product</a>

                  Hand-Ground Red Chili – <a href="/product/Hand-Ground Red Chili">View Product</a>

                  Prohibited Topics:
                  Technology, software development, health, wellness, politics, current events.`+productdata
          },
          { role: "user", content: userInput },
        ],
      });

      console.log(completion.choices[0]?.message?.content);
      return NextResponse.json({
        reply: completion.choices[0]?.message?.content || "",
      });
    }

    if(task === "search"){
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", 
            content: `
                      You are an autocomplete assistant for an e-commerce platform. 

                      Given a user input, return a list of 5 relevant product names. 
                      Do not include any explanations, introductions, or phrases like "Here are 5 items related to...". 

                      Only return plain product names, one per line, without numbering or bullet points. 
                      Keep the output minimal and clean, like:

                      product name  
                      product name  
                      product name  
                      product name  
                      product name

                      also the products should match from categories such as 
                      Clothing,Farming,Handcraft,Vegetable,Grains and Pulses,Seeds and Sapling,Dairy Products
                    ` },
          { role: "user", content: userInput },
        ],
        model: "compound-beta-mini",
      });
      return NextResponse.json({ result: completion.choices[0]?.message?.content || "" });
    }
    if(task =='STT'){
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: userInput },
        ],
        model: "llama3-70b-8192",
      });
      return NextResponse.json({ result: completion.choices[0]?.message?.content || "" });
    }
    if(task == 'translate'){
      const completion = await groq.chat.completions.create({
        messages: [
          {role: "system" , content:`
            You are a translation assistant.

            Your task is to translate product data into the target language: ${lang}.

            Instructions:
            - Return only the translated output.
            - No explanations, no additional text.
            - Each product has a name and a description.
            - Format each product as a JSON object with "name" and "description" keys.
            - Return the final result as a JSON array of such objects.

            Example format:
            [
              { "name": "Translated Name 1", "description": "Translated Description 1" },
              { "name": "Translated Name 2", "description": "Translated Description 2" },
              ...
            ]
            `},
          { role: "user", content: userInput },
        ],
        model: "compound-beta",
      });
      return NextResponse.json({ result: completion.choices[0]?.message?.content || "" });
    }
    return NextResponse.json({ error: "Invalid task type" }, { status: 400 });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
