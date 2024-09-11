import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import YoutubeEmbed from "./YoutubeEmbed";

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

const Card = ({
  details,
  clickable,
  handleCardClick,
  content,
  rtl,
  showBSL,
}) => {
  const { locale } = useRouter();

  const websitesArr = details.Links?.split(",");
  const phonesArr = details.Phones?.split(",");
  const email = details.Email;

  const contents = (
    <>
      <h1
        className={`text-lg font-medium py-2 border-b border-gray-300 bg-secondary px-4 ${
          rtl ? "text-right" : "text-left"
        }`}
      >
        {details[`Title-${locale}`] || details.Title}
      </h1>
      <p
        className={`text-md text-black mt-2 px-4 ${
          rtl ? "text-right" : "text-left"
        }`}
      >
        <ReactMarkdown
          components={{
            // Map `h1` (`# heading`) to use `h2`s.
            a: ({ node, ...props }) => (
              <a
                className="underline text-black hover:text-blue-800"
                onClick={(e) => {
                  // e.preventDefault();
                  e.stopPropagation();
                }}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
          className="markdown space-y-4"
          children={details[`Description-${locale}`] || details.Description}
        />
        <style jsx global>
          {`
            .markdown a {
              text-decoration: underline !important;
            }

            .markdown p {
              margin: 8px 0px !important;
            }
          `}
        </style>
      </p>
    </>
  );

  return clickable ? (
    <div
      role="button"
      onClick={handleCardClick}
      className=" w-full max-w-m  border-gray-300 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between"
    >
      {contents}
      {showBSL && details["Title-bsl"] && (
        <div className="px-4" key="youtube">
          <YoutubeEmbed videoId={details["Title-bsl"]} />
        </div>
      )}
      <button
        className={`mt-4 ${
          rtl ? "self-start ml-2" : "self-end mr-2"
        } border border-primary bg-white text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-sm rounded-full px-3 py-2`}
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
      >
        {content.buttonText[`text-${locale}`] || content.buttonText[`text-en`]}
      </button>
    </div>
  ) : (
    <>
      <div className="w-full max-w-m  border-gray-300 rounded-lg overflow-hidden pb-4 border flex flex-col justify-between bg-white">
        {contents}
        {showBSL && details["Title-bsl"] && (
          <div key="youtube" className="px-4">
            <YoutubeEmbed videoId={details["Title-bsl"]} />
          </div>
        )}
        <div className={`mt-4 px-4 flex ${rtl ? "self-end" : ""}`}>
          {!rtl && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-black h-6 w-6"
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
          )}

          <div>
            {websitesArr?.length &&
              websitesArr.map((url) => (
                <a
                  key={url}
                  className={`${
                    rtl ? "mr-2 text-right" : "ml-2"
                  } underline text-blue-700`}
                  href={formatUrl(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              ))}
          </div>
          {rtl && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-black h-6 w-6"
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
          )}
        </div>
        <div className={`mt-4 px-4 flex ${rtl ? "self-end" : ""}`}>
          {!rtl && (
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
          )}

          <div>
            {phonesArr?.length &&
              phonesArr.map((number) => (
                <a href={`tel:${number}`} key={number}>
                  <p
                    className={`${
                      rtl ? "mr-2 text-right" : "ml-2"
                    } text-blue-700 md:text-black`}
                  >
                    {number}
                  </p>
                </a>
              ))}
          </div>

          {rtl && (
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
          )}
        </div>
        {email && email !== "N/A" && (
          <div className={`mt-4 px-4 flex ${rtl ? "self-end" : ""}`}>
            {!rtl && (
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
            <a href={`mailto:${email?.replace("mailto:", "")}`} key={email}>
              <p
                className={`${
                  rtl ? "mr-2 text-right" : "ml-2"
                } text-blue-700  underline`}
              >
                {email.replace("mailto:", "")}
              </p>
            </a>
            {rtl && (
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
