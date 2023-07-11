import airtableFetch from "../../methods/recursiveFetch";

const generalAPI = async (view) => {
  return airtableFetch("General");
};

export default generalAPI;
