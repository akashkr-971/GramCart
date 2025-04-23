import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { userInput ,task , actor, sellerdata, lang,mode } = await req.json();

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
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
    You are GramiAi, a friendly and knowledgeable shopping assistant for GramCart.

    Your job:
    - Help customers discover products across our categories.
    - Provide direct links (relative URLs) to the product pages.
    - Offer 2–3 concise suggestions tailored to the user’s query.
    - Mention product names, brief benefits, and a link like /products/{id}.

    Tone:
    - Conversational and helpful.
    - No long policies or disclaimers.
    - Focus on guiding the user to the right products.

    strict rules:
    - Do NOT answer questions related to:
      - Technology or software development
      - Health or wellness
      - Politics or current events
      - the link to products should start with product/product-name
      - if a product is asked show its link if asked for wheat show details about whaet and link
      - if asked for a specific product show its details and link like the rest of the products and no need for descriptions and things like if youre intresed and all
      - if asked a specific product provide its title and link and
      - if there is no specific product show similar products
      - If the user’s query is general (no single product named), return 2–3 relevant products without any description**
      - If the user asks about a specific product (e.g., “wheat”), return exactly
      - Do NOT include phrases like “if you’re interested,” or any marketing fluff—just titles and links.

    Example response:
    “Sure! You might like:
    1. **Organic Turmeric Powder** – Great for immunity – <a href="/product/Organic Turmeric Powder">View Product</a>
    2. **Handwoven Cotton Scarf** – Breathable & stylish – <a href="/product/Handwoven Cotton Scarf">View Product</a>
    3. **Fresh Farm Eggs (12-pack)** – Delivered daily – <a href="/product/Fresh Farm Eggs (12-pack)">View Product</a>”
            `,
          },
          { role: "user", content: userInput },
        ],
      });

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
