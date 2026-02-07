"use client";

import InterviewDataContext from "@/context/InterviewDataContext";
import React, { useContext } from "react";
import { Timer, Mic, MicOff, PhoneOff } from "lucide-react";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);

  return (
    <div className="min-h-screen bg-gray-100 p-10 lg:px-32 xl:px-40">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-xl">AI Interview Session</h2>
        <div className="flex items-center gap-2 font-medium">
          <Timer className="w-5 h-5" />
          00:00:00
        </div>
      </div>

      {/* Interview Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* AI Recruiter */}
        <div className="bg-white rounded-2xl shadow h-[350px] flex items-center justify-center">
          <div className="text-center">
            <img
              src="/ai-avatar.png"
              alt="AI Recruiter"
              className="w-20 h-20 rounded-full mx-auto"
            />
            <p className="mt-3 font-semibold">AI Recruiter</p>
          </div>
        </div>

        {/* Candidate */}
        <div className="bg-white rounded-2xl shadow h-[350px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
              {interviewInfo?.userName?.[0]?.toUpperCase()}
            </div>
            <p className="mt-3 font-semibold">
              {interviewInfo?.userName}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-6">
        <button className="w-14 h-14 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-800">
          <Mic className="w-6 h-6" />
        </button>

        <button className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700">
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}

export default StartInterview;
