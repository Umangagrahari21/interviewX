"use client";

import { useState } from "react";
import InterviewHeader from "@/app/interview/_components/InterviewHeader";
import InterviewDataContext from "@/context/InterviewDataContext";

export default function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState(null);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <InterviewHeader />
      {children}
    </InterviewDataContext.Provider>
  );
}
