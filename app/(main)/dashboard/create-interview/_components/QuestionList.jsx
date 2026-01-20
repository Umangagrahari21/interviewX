import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const QuestionList = ({ formData }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log(result.data);
    } catch (error) {
      toast("Server error, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-200 flex gap-3 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-semibold">
              Generating Interview Questions
            </h2>
            <p className="text-sm text-gray-600">
              Our AI is crafting personalized questions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
