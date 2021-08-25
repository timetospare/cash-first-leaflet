import { useState, useEffect, useContext, useRef } from "react";

export const Pagination = ({
  children,
  step,
  setStep,
  step1Selected,
  header,
}) => {
  const parentEl = useRef(null);

  useEffect(() => {
    if (parentEl.current) {
      parentEl.current.scrollTop = 0;
    }
  }, [step]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-auto bg-gray-50" ref={parentEl}>
        <div className="mx-auto max-w-2xl md:px-4 px-2  pb-4 bg-white">
          {header}
          <div className="w-full flex flex-row justify-center border-t border-b items-center text-white space-x-6 p-2 md:p-4 mb-8 mt-4">
            <button
              onClick={() => setStep(1)}
              className={`${
                step === 1 ? "text-gray-800" : "text-gray-300"
              }  whitespace-nowrap`}
            >
              Step 1
            </button>
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
                strokeWidth="1"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <button
              onClick={() => setStep(2)}
              disabled={step <= 2}
              className={`${
                step === 2 ? "text-gray-800" : "text-gray-300"
              }  text-sm sm:text-base whitespace-nowrap`}
            >
              Step 2
            </button>
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
                strokeWidth="1"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <button
              disabled={step <= 3}
              className={`${
                step === 3 ? "text-gray-800" : "text-gray-300"
              } text-sm sm:text-base whitespace-nowrap`}
            >
              Step 3
            </button>
          </div>
          {children}
        </div>
      </div>

      <div className="w-full bg-white md:py-4 py-2  border-t border-gray-300">
        <div className="mx-auto max-w-2xl px-2 md:px-4 w-full flex justify-between">
          {step !== 1 && (
            <button
              type="button"
              className="text-xl inline-flex items-center px-2.5 py-1.5 border border-gray-200 shadow-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setStep((oldStep) => oldStep - 1)}
            >
              Back
            </button>
          )}
          {/* second step doesnt need a next button since only one option is selectable */}
          {step === 1 && (
            <button
              type="button"
              className={`text-xl inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
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
    </div>
  );
};
