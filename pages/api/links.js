import airtableFetch from "../../methods/recursiveFetch";

const linksAPI = async (view) => {
  return airtableFetch("Links");
};

export default linksAPI;
