import { useRouter } from "next/router";
import orgAPI from "./api/orgs";

const Leaflet = ({ records }) => {
  const { query } = useRouter();
  const { id } = query;

  console.log({ records });
  return <div>{id}</div>;
};

export async function getStaticProps() {
  const records = await orgAPI("view");

  return {
    props: {
      records,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = [];

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Leaflet;
