import { useState, useEffect, useContext } from "react";

export const Pagination = ({ children, step, setStep, step1Selected }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="w-full flex flex-row justify-center items-center text-white space-x-6 p-4 pb-4">
        <div
          className={`${
            step === 1 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded text-xs sm:text-base p-2 whitespace-nowrap`}
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <div
          className={`${
            step === 2 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded text-xs sm:text-base p-2 whitespace-nowrap`}
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <div
          className={`${
            step === 3 ? "bg-indigo-600" : "bg-indigo-300"
          } rounded text-xs sm:text-base p-2 whitespace-nowrap`}
        >
          Step 3
        </div>
      </div>
      <div className="overflow-scroll">{children}</div>

      <div className="w-full bg-white p-4 flex justify-between">
        {step !== 1 && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setStep((oldStep) => oldStep - 1)}
          >
            Back
          </button>
        )}
        {/* second step doesnt need a next button since only one option is selectable */}
        {step !== 3 && step !== 2 && (
          <button
            type="button"
            className={`inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              step === 1 && "ml-auto"
            } ${
              step1Selected?.length === 0 &&
              "cursor-not-allowed bg-indigo-300 hover:bg-indigo-400"
            }`}
            disabled={step1Selected?.length === 0}
            onClick={() => setStep((oldStep) => oldStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
