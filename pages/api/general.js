// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from "airtable";

const generalAPI = async (location) => {
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
  });
  const airtable = new Airtable();
  const base = airtable.base("appEay9REblCErAGJ");

  let record = query.getRecord(recordId);


  const query = await table.selectRecordsAsync();


  base("General").find("recBv3zbQMeb80mSH", function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Retrieved", record.id);
  });
};

export default generalAPI;
