import { QUESTION_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// export async function POST(req) {
//   console.log("✅ API HIT");
//   const body = await req.json();
// console.log("✅ REQUEST BODY:", body);


export async function POST(req){
    const {jobPosition,jobDescription,duration,type}=await req.json();

      const FINAL_PROMPT = QUESTION_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);
      console.log(FINAL_PROMPT);
    try{

    const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
  
    })
  const completion = await openai.chat.completions.create({
    // model: "google/gemini-2.0-flash-exp:free",
    //     model: "google/gemini-1.5-flash",
        model:  "google/gemini-1.5-pro",

    messages: [
      { role: "user", content:FINAL_PROMPT}
    ],
    // responze_format 
  })
  console.log(completion.choices[0].message)
  // return NextResponse.json(completion.choices[0].message)
  // const rawContent = completion.choices[0].message.content;
  const rawContent = completion.choices[0].message.content;
console.log("RAW AI RESPONSE:", rawContent);


   const parsed = JSON.parse(rawContent);
   return NextResponse.json(parsed);



}
    catch(e){
        console.log(e);
        return NextResponse.json(e);
    }


}