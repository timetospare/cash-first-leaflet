import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";

export const Pagination = ({
  children,
  step,
  setStep,
  content,
  step1Selected,
  rtl,
  header,
}) => {
  const parentEl = useRef(null);

  const { locale } = useRouter();

  useEffect(() => {
    if (parentEl.current) {
      parentEl.current.scrollTop = 0;
    }
  }, [step]);

  const numbers = rtl ? [3, 2, 1] : [1, 2, 3];

  let buttons = [
    <button
      type="button"
      className={`text-xl inline-flex items-center px-2.5 py-1.5 border border-gray-200 shadow-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 ${
        rtl ? "ml-auto" : ""
      } focus:ring-offset-2 focus:ring-indigo-500`}
      onClick={() => setStep((oldStep) => oldStep - 1)}
    >
      {content.backButton[`text-${locale}`] || content.backButton[`text-en`]}
    </button>,
    <button
      type="button"
      className={`text-xl inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        rtl ? "" : "ml-auto"
      } ${
        step1Selected?.length === 0 &&
        "cursor-not-allowed bg-indigo-300 hover:bg-indigo-400"
      }`}
      disabled={step1Selected?.length === 0}
      onClick={() => setStep((oldStep) => oldStep + 1)}
    >
      {content.nextButton[`text-${locale}`] || content.nextButton[`text-en`]}
    </button>,
  ];

  if (rtl) {
    buttons = buttons.reverse();
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-auto bg-gray-50" ref={parentEl}>
        <div className="mx-auto max-w-2xl md:px-6 px-2  pb-4 bg-white">
          {header}
          <div className="w-full flex flex-row justify-center border-t border-b items-center text-white space-x-6 p-2 md:p-4 mb-8 mt-4">
            {numbers.map((item, i) => (
              <>
                <button
                  onClick={() => setStep(item)}
                  className={`${
                    step === item ? "text-gray-800" : "text-gray-300"
                  }  whitespace-nowrap`}
                >
                  {rtl && `${item} `}
                  {content.stepName[`text-${locale}`] ||
                    content.stepName[`text-en`]}
                  {!rtl && ` ${item}`}
                </button>
                {i !== numbers.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 text-gray-600 ${
                      rtl ? "rotate-180" : ""
                    }`}
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
                )}
              </>
            ))}
          </div>
          {children}
        </div>
      </div>

      <div className="w-full bg-white md:py-4 py-2  border-t border-gray-300">
        <div className="mx-auto max-w-2xl px-2 md:px-4 w-full flex justify-between">
          {step === 1 ? buttons[rtl ? 0 : 1] : buttons[rtl ? 1 : 0]}
        </div>
      </div>
    </div>
  );
};
