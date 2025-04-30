"use client";
import { useState } from "react";

const faqsData = {
    "lorem ipsum dolor": [
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
      {
       question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
    ],
    "lorem ipsum dolor2": [
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
    ],
    "lorem ipsum dolor3": [
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
    ],
    "lorem ipsum dolor4": [
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
    ],
    "lorem ipsum dolor5": [
      {
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      },
    ],
  };

export default function FAQs() {
  const topics = Object.keys(faqsData);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleAnswer = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex flex-col items-center mt-16 justify-center gap-8">
      <h1 className="text-3xl font-bold">FAQs</h1>
      <div className="w-[80%] grid grid-cols-[35%_65%] gap-1">
        {/* Left Side: Topics */}
        <div className="w-full flex flex-col items-center justify-start gap-2">
          {topics.map((topic) => (
            <div
              key={topic}
              onClick={() => {
                setSelectedTopic(topic);
                setExpandedQuestions({});
              }}
              className={`w-[90%] p-3 cursor-pointer ${
                selectedTopic === topic ? "bg-blue-100 border-blue-400" : "bg-slate-50"
              } border-2 border-slate-200 text-center rounded-lg text-xl font-medium`}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Right Side: Questions and Answers */}
        <div className="w-full">
          <div className="flex flex-col items-start justify-start gap-4">
            {faqsData[selectedTopic].map((item, index) => (
              <div key={index} className="w-full">
                <div
                  className="flex justify-between w-full cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <h2 className="text-xl font-bold">{item.question}</h2>
                  <span className="text-red-500 text-2xl">
                    {expandedQuestions[index] ? "-" : "+"}
                  </span>
                </div>
                {expandedQuestions[index] && (
                  <p className="mt-2 text-gray-700">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
