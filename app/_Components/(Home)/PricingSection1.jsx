// components/PricingSection.jsx
"use client";
import React, { useState, useEffect } from "react";

export default function PricingSection1({ userType, userId, isLoggedIn }) {
  const [billing, setBilling] = useState("Monthly");
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansRes = await fetch("/api/plans");
        if (!plansRes.ok) throw new Error("Failed to fetch plans");
        const plansData = await plansRes.json();
        setPlans(plansData);
        // setCurrentPlan(null);
        // console.log(userId + "" + userType + "" + isLoggedIn);
        // Only fetch current user plan if logged in
        if (isLoggedIn && userType && userId) {
          const planRes = await fetch(`/api/subscribe/${userId}/${userType}`);
          if (!planRes.ok) throw new Error("Failed to fetch user plan");
          const planData = await planRes.json();
          setCurrentPlan(planData?.plan || null);
        } else {
          setCurrentPlan(null); // Clear current plan if not logged in
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [userType, userId, isLoggedIn]);

  const handleRegister = async (plan) => {
    if (plan.title === "Enterprise") {
      alert("Please contact us for Enterprise plans.");
      return;
    }

    if (!isLoggedIn) {
      alert("Login to register for a plan.");
      window.location.href = "/signin";
      return;
    }

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userType,
        planId: plan.id,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert(`Subscribed to ${plan.title} plan!`);
      setCurrentPlan(plan); // Update UI instantly
    } else {
      alert("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#f2f2fa] to-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pricing & Plans</h2>
        <div className="flex items-center justify-center mb-10 space-x-4 bg-slate-200 p-1 rounded-full shadow-sm w-fit mx-auto">
          <button
            onClick={() => setBilling("Monthly")}
            className={`py-2 px-4 rounded-full text-sm font-medium ${
              billing === "Monthly" ? "bg-white text-black" : "text-gray-700"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBilling("Yearly")}
            className={`py-2 px-4 rounded-full text-sm font-medium ${
              billing === "Yearly" ? "bg-white text-black" : "text-gray-700"
            }`}
          >
            Yearly billing{" "}
            <span className="text-xs text-green-600 ml-1">Save ~20%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {plans.length > 0 &&
            plans.map((plan, idx) => (
              <div
                key={idx}
                className={`border rounded-xl shadow-md p-2 flex flex-col items-start bg-slate-100 relative transition-all hover:shadow-xl hover:border-black`}
              >
                {console.log(plan)}
                <div className="bg-white p-2 flex items-start justify-start flex-col mb-4 rounded-lg shadow-sm w-full">
                  <div className="flex items-center gap-4 w-full mb-2">
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                    {plan.popular && (
                      <div className="top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                  <hr className="h-1 w-[95%] text-slate-700 text-center" />
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <p className="text-4xl font-bold">
                      {plan.title === "Enterprise" ? "" : "₹"}
                      {billing === "Monthly"
                        ? plan.priceMonthly
                        : plan.priceYearly}
                    </p>
                  </div>
                </div>

                <div className="mb-7 flex flex-col items-start justify-start w-full">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                    Card Rates From
                  </p>
                  <p className="text-sm text-gray-800">{plan.rate}</p>
                </div>

                <div className="mb-6 flex flex-col items-start justify-start gap-2 w-full">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                    Standout Features
                  </p>
                  <ul className="space-y-2 text-sm text-gray-800">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>✔️</span> {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleRegister(plan)}
                  disabled={currentPlan?.id === plan.id}
                  className={`mt-auto w-full py-2 px-4 rounded-lg text-sm font-semibold ${
                    currentPlan?.id === plan.id
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-white text-black hover:bg-black hover:text-white border border-gray-300"
                  }`}
                >
                  {currentPlan?.id === plan.id
                    ? "Current Plan"
                    : plan.title === "Enterprise"
                    ? "Contact Us"
                    : "Register Now"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
