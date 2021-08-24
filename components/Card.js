import { useEffect, useState } from "react";
import Link from "next/link";

const Card = ({ details, clickable, handleCardClick }) => {
  console.log({ details });

  const websitesArr = details.Links?.split(",");
  const phonesArr = details.Phones?.split(",");

  console.log({ websitesArr, phonesArr });

  const contents = (
    <>
      <h1 className="text-2xl font-bold my-4 px-4">{details.Title}</h1>
      <p className="text-1xl font-bold my-4 px-4">{details.Description}</p>
    </>
  );

  return clickable ? (
    <div
      role="button"
      onClick={handleCardClick}
      className="m-4 w-full max-w-m bg-green-400 border-gray-400 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between bg-white shadow-lg"
    >
      {contents}
      <button
        className="w-36 mr-2 self-end border-gray-500 border-2 bg-none text-gray-500 text-md rounded-full px-4 py-2"
        onClick={handleCardClick}
      >
        Read More
      </button>
    </div>
  ) : (
    <>
      <div className="m-4 w-full max-w-m bg-green-400 border-gray-400 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between bg-white shadow-lg">
        {contents}
        <div className="my-4 px-4">
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
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          {websitesArr?.length && websitesArr.map((url) => <p>{url}</p>)}
        </div>
        <div className="my-4 px-4">
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
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {phonesArr?.length && phonesArr.map((number) => <p>{number}</p>)}
        </div>
      </div>
    </>
  );
};

export default Card;
