// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from "airtable";

export default orgAPI = async (req, res) => {
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
  });
  const airtable = new Airtable();
  const base = airtable.base("appEay9REblCErAGJ");

  const data = await base.select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view",
  });

  res.status(200).json(data);
};
