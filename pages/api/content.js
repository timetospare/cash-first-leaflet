// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from "airtable";

const contentAPI = async (view) => {
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
  });
  const airtable = new Airtable();
  const base = airtable.base("appEay9REblCErAGJ");

  const data = await base("Content")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 100,
      view,
    })
    .all();

  return data.map((record) => record._rawJson);
};

export default contentAPI;
