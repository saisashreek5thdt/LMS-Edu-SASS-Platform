"use client";
import { useState } from "react";

const faqsData = {
    "Data Science Course Curriculum": [
      {
        question: "What is the Data Science Course Curriculum?",
        answer:
          "The Data Science Course Curriculum is a comprehensive program designed to equip students with skills in data analysis, machine learning, statistical modeling, and data visualization.",
      },
      {
        question: "Who can take the Data Science course?",
        answer:
          "Anyone with an interest in data and basic programming knowledge can enroll in the Data Science course.",
      },
      {
        question: "Who can take the Data Science course?",
        answer:
          "Anyone with an interest in data and basic programming knowledge can enroll in the Data Science course.",
      },
      {
        question: "Who can take the Data Science course?",
        answer:
          "Anyone with an interest in data and basic programming knowledge can enroll in the Data Science course.",
      },
      {
        question: "Who can take the Data Science course?",
        answer:
          "Anyone with an interest in data and basic programming knowledge can enroll in the Data Science course.",
      },
      {
        question: "Who can take the Data Science course?",
        answer:
          "Anyone with an interest in data and basic programming knowledge can enroll in the Data Science course.",
      },
    ],
    "Machine Learning Course Curriculum": [
      {
        question: "What will I learn in the Machine Learning course?",
        answer:
          "You will learn supervised and unsupervised learning, neural networks, and hands-on ML model training.",
      },
    ],
    "AI Course Curriculum": [
      {
        question: "Does the AI curriculum cover deep learning?",
        answer: "Yes, it includes deep learning, NLP, and AI ethics modules.",
      },
    ],
    "Full Stack Course Curriculum": [
      {
        question: "What is taught in Full Stack Development?",
        answer:
          "You'll learn frontend (HTML/CSS/JS, React), backend (Node.js, Express), and databases (MongoDB, SQL).",
      },
    ],
    "Cyber security Course Curriculum": [
      {
        question: "What does the Cyber Security course include?",
        answer:
          "It includes network security, cryptography, ethical hacking, and security protocols.",
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
