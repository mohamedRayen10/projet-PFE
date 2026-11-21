import React, { useState } from "react";
import axios from "axios"; // <== ADD THIS

const plans = [
  {
    type: "Free",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
    price: "$0",
    features: [
      "2 links",
      "Own analytics platform",
      { name: "Chat support", disabled: true },
      { name: "Mobile application", disabled: true },
      { name: "Unlimited users", disabled: true }
    ],
    btnStyle: "bg-pink-100 text-pink-600 hover:shadow-pink-300",
    iconRounded: true
  },
  {
    type: "Pro",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
    price: "$18",
    label: "Best Value",
    features: [
      "2 links",
      "Own analytics platform",
      "Chat support",
      { name: "Mobile application", disabled: true },
      { name: "Unlimited users", disabled: true }
    ],
    btnStyle: "bg-pink-600 text-white hover:shadow-pink-400",
    highlight: true
  },
  {
    type: "Enterprise",
    desc: "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
    price: "Let's Talk",
    features: [
      "2 links",
      "Own analytics platform",
      "Chat support",
      "Mobile application",
      "Unlimited users",
      "Customize Panel"
    ],
    btnStyle: "bg-white text-blue-600 hover:shadow-white",
    entp: true
  }
];

const PlanCard = ({ type, desc, price, features, btnStyle, label, iconRounded, highlight, entp }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (price === "$0") {
      alert("✅ You have selected the Free plan.");
      return;
    }

    if (price === "Let's Talk") {
      alert("📞 Please contact our sales team for Enterprise pricing.");
      return;
    }

    try {
      setLoading(true);
      const amount = parseInt(price.replace("$", "")) * 100;

      const res = await axios.post("backend/payment/submit-payment", {
        amount
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Something went wrong. No redirect URL.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col p-6 rounded-xl border ${
        highlight ? "shadow-lg" : "border-gray-200"
      } ${entp ? "bg-blue-600 text-white" : "bg-white"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 border-2 border-blue-600 ${
            iconRounded ? "rounded-full" : "rounded"
          } relative flex items-center justify-center`}
        >
          <div
            className={`w-4 h-4 border-2 border-pink-500 ${
              iconRounded ? "rounded-full" : "rounded"
            }`}
          ></div>
        </div>
        <h2 className="text-xl font-medium flex-1">{type}</h2>
        {label && (
          <span className="text-sm bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold">
            {label}
          </span>
        )}
      </div>
      <p className={`mt-4 text-sm ${entp ? "text-white/80" : "text-gray-600"}`}>{desc}</p>
      <div className="mt-8 text-3xl font-semibold">
        {price}{" "}
        {price.includes("$") && (
          <span className="text-base font-normal text-gray-500">/ month</span>
        )}
      </div>
      <ul
        className={`mt-8 mb-6 space-y-4 text-sm font-medium ${
          entp ? "text-white" : "text-black"
        }`}
      >
        {features.map((f, i) => {
          const isObj = typeof f === "object";
          const disabled = isObj && f.disabled;
          const name = isObj ? f.name : f;
          return (
            <li key={i} className={`flex items-center gap-3 ${disabled ? "text-gray-400" : ""}`}>
              <span className="w-5 h-5">
                {disabled ? (
                  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 1.414 16.586 0 9 7.586 1.414 0 0 1.414 7.586 9 0 16.586 1.414 18 9 10.414 16.586 18 18 16.586 10.414 9 18 1.414Z"
                      fill="#B1B8C9"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.552.134 5.717 10.97 1.448 6.701 0 8.149l5.717 5.717L18 1.583 16.552.134Z"
                      fill={entp ? "#fff" : "#EA455F"}
                    />
                  </svg>
                )}
              </span>
              {name}
            </li>
          );
        })}
      </ul>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`mt-auto w-full px-4 py-3 font-semibold rounded-lg transition-transform duration-150 hover:-translate-y-1 shadow-sm ${btnStyle}`}
      >
        {loading ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
};

const Plans = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-black">Simple, transparent pricing</h1>
          <p className="text-gray-600">No contracts. No suprise fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
