import { useEffect, useState } from "react";
import Link from "next/link";

const formatUrl = (url) => {
  if (!url) {
    return null;
  }
  if (url.substring(0, 4)?.toLowerCase() === "http") {
    return url;
  } else {
    return `https://${url}`;
  }
};

const Card = ({ details, clickable, handleCardClick }) => {
  const websitesArr = details.Links?.split(",");
  const phonesArr = details.Phones?.split(",");

  const contents = (
    <>
      <h1 className="text-lg font-medium py-2 border-b border-gray-300 bg-gray-50 px-4">
        {details.Title}
      </h1>
      <p className="text-md text-gray-700 mt-2 px-4">{details.Description}</p>
    </>
  );

  return clickable ? (
    <div
      role="button"
      onClick={handleCardClick}
      className=" w-full max-w-m  border-gray-300 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between"
    >
      {contents}
      <button
        className="w-36 mr-2 mt-4 self-end border bg-none bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-md rounded-full px-3 py-2"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
      >
        Contact
      </button>
    </div>
  ) : (
    <>
      <div className="w-full max-w-m bg-green-400 border-gray-300 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between bg-white">
        {contents}
        <div className="mt-4 px-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          <div>
            {websitesArr?.length &&
              websitesArr.map((url) => (
                <a
                  className="ml-2 underline text-blue-700"
                  href={formatUrl(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              ))}
          </div>
        </div>
        <div className="mt-4 px-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div>
            {phonesArr?.length &&
              phonesArr.map((number) => <p className="ml-2">{number}</p>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
