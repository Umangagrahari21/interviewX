"use client";

import React, { useContext, useEffect,useRef } from "react";
import InterviewDataContext from "@/context/InterviewDataContext";
import { Mic, Timer,Phone } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";

export default function StartInterview() {
  const context = useContext(InterviewDataContext);
  // const vapi=new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY)
  const vapiRef = useRef(null);

useEffect(() => {
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  }
}, []);


  if (!context) {
    return <p className="text-red-500">Context not found</p>;
  }

  const { interviewInfo } = context;

  const userInitial = interviewInfo?.userName
    ? interviewInfo.userName.charAt(0).toUpperCase()
    : "?";

    //logic
    useEffect(() => {
  if (interviewInfo?.interviewData) {
    startCall();
  }
}, [interviewInfo]);


    const startCall = () => {
  const questionList = interviewInfo?.interviewData?.questionList
    ?.map((item) => item.question)
    .join(", ");

  const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
    transcription: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI voice assistant conducting interviews.
Ask questions one by one.

Job Position: ${interviewInfo?.interviewData?.jobPosition}
Questions: ${questionList}
          `.trim(),
        },
      ],
    },
  };

  vapiRef.current.start(assistantOptions);
};

  const stopInterview = () => {
  vapiRef.current?.stop();
};

  return (
    <div className="min-h-screen bg-gray-100 p-10 lg:px-32 xl:px-40">
      <h2 className="font-bold text-xl mb-3">AI Interview Session</h2>

      <div className="flex gap-2 items-center text-gray-700 mb-8">
        <Timer size={20} />
        <span>00:00:00</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* AI Recruiter */}
        <div className="bg-white p-10 rounded-lg border flex flex-col items-center gap-3">
          <Image
            src="/ai.png"
            alt="AI Recruiter"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <h2 className="font-medium">AI Recruiter</h2>
        </div>

        {/* User */}
        <div className="bg-white p-10 rounded-lg border flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {userInitial}
          </div>
          <h2 className="font-medium">{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded full "/>
        <AlertConfirmation stopInterview={()=>stopInterview()}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded full "/>
        </AlertConfirmation>
        
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">Interview in Progress...</h2>
    </div>
  );
}
