import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PostcodeLookup from "../components/PostcodeLookup";
import defaultContent from "../models/defaultContent";
import contentAPI from "./api/content";
import generalAPI from "./api/general";

const groupArrayByValue = (array, key, values) => {
  const grouped = {};
  values.forEach((value) => {
    grouped[value] = array.filter((item) => item[key] === value);
  });
  return grouped;
};

const GridSquare = ({ area, embed }) => {
  return (
    <a
      href={`/${area?.Location}`}
      key={area?.Title}
      target={embed ? "_blank" : ""}
      rel={embed && "noopener noreferrer"}
      className="relative rounded-xl block overflow-hidden bg-primary hover:opacity-90 "
    >
      <div className="h-64 w-full hover:scale-110 transition-all">
        {area?.["Social Image"] && (
          <Image
            alt=""
            objectFit="cover"
            sizes="320 400 600"
            layout="fill"
            src={area?.["Social Image"] || ""}
          />
        )}
      </div>

      <div
        style={{ height: "50%" }}
        className="from-white opacity-50 to-black bg-gradient-to-b bottom-0 absolute z-10"
      />
      <h2 className="absolute bottom-0 left-0 px-4 my-2 py-2 w-full bg-primary text-white z-20 font-medium text-xl">
        {area?.Title}
      </h2>
    </a>
  );
};

const Home = ({ areas, content }) => {
  const { locale, query } = useRouter();
  const { embed } = query;
  const [postcodeObj, setPostcodeObj] = useState(null);

  const filteredAreas = postcodeObj
    ? [
        areas[0],
        ...areas.filter((area) =>
          area.Title?.replace(new RegExp("&", "g"), "")
            .replace(new RegExp("and", "g"), "")
            .toLowerCase()
            .includes(
              postcodeObj.names?.laua
                .replace(new RegExp("&", "g"), "")
                .replace(new RegExp("and", "g"), "")
                .toLowerCase()
            )
        ),
      ]
    : areas;

  const countries = ["UK", "Scotland", "England", "Greater London", "Wales"];
  const countryAreas = groupArrayByValue(filteredAreas, "Country", countries);

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>
          {content.mainTitle[`text-${locale}`] || content.mainTitle[`text-en`]}
        </title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full mx-auto">
        <div className="max-w-6xl px-2 mx-auto">
          {!embed && (
            <h1 className="text-3xl my-6 font-medium">
              {content.mainTitle[`text-${locale}`] ||
                content.mainTitle[`text-en`]}
            </h1>
          )}

          <PostcodeLookup handleSearch={(obj) => setPostcodeObj(obj)} />
        </div>

        {!embed && (
          <div className="max-w-6xl px-2 mx-auto flex flex-wrap">
            {countries.map((country) => (
              <a href={`#${country}`} key={country} className="mr-2 mb-2">
                <div className="bg-white border-2 text-primary border-primary hover:bg:gray-50 rounded-md hover:shadow-lg px-4 py-2">
                  <h2 className="text-lg font-medium">{country}</h2>
                </div>
              </a>
            ))}
          </div>
        )}

        {postcodeObj ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 max-w-6xl mx-auto px-2">
            {filteredAreas.map((area) =>
              embed ? (
                <GridSquare area={area} embed />
              ) : (
                <Link href={`/${area?.Location}`} key={area?.Title}>
                  <GridSquare area={area} />
                </Link>
              )
            )}
          </div>
        ) : (
          <div>
            {countries.map((country) => (
              <>
                <h1
                  id={country}
                  className="bg-gray-50 border-t border-b border-gray-300 text-xl font-medium py-4 my-4"
                >
                  <div className="max-w-6xl mx-auto px-2">{country}</div>
                </h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 max-w-6xl mx-auto px-2">
                  {countryAreas[country].map((area) =>
                    embed ? (
                      <GridSquare area={area} embed />
                    ) : (
                      <Link href={`/${area?.Location}`} key={area?.Title}>
                        <GridSquare area={area} />
                      </Link>
                    )
                  )}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const promises = [generalAPI("Grid view"), contentAPI("Grid view")];

  const [areas, content] = await Promise.allSettled(promises);

  return {
    props: {
      areas:
        areas.status === "fulfilled" ? areas.value?.map((ar) => ar.fields) : [],
      content:
        content.status === "fulfilled"
          ? content.value?.reduce((obj, item) => {
              const { content, ...rest } = item.fields;
              obj[content] = rest;
              return obj;
            }, {})
          : defaultContent,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  };
}

export default Home;
