import { useState, useEffect, useContext } from "react";

export const Pagination = ({ children }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div className="flex flex-row justify-center items-center text-white space-x-6">
        <div
          className={`${
            step === 1 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded p-2`}
        >
          Step 1
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <div
          className={`${
            step === 2 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded p-2`}
        >
          Step 2
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <div
          className={`${
            step === 3 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded p-2`}
        >
          Step 3
        </div>
      </div>
      {children}
      <div className="self-end">
        {step !== 1 && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setStep((oldStep) => oldStep - 1)}
          >
            Back
          </button>
        )}
        {/* second step doesnt need a next button since only one option is selectable */}
        {step !== 3 && step !== 2 && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent  font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setStep((oldStep) => oldStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
