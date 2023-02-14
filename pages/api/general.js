// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from "airtable";

const generalAPI = async (view) => {
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
  });
  const airtable = new Airtable();
  const BASE_ID = "appEay9REblCErAGJ";
  // const base = airtable.base("appEay9REblCErAGJ");

  const records = [];

  const PAGE_SIZE = 100;

  // dont use the api because it's a mess

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/General?view=Grid%20view&pageSize=${PAGE_SIZE}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );
    const rawData = await response.json();
    rawData.records.forEach((record) => {
      records.push(record.fields);
    });

    const recursiveFetch = async (offset) => {
      if (!offset) return Promise.resolve(records);
      const response = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/General?view=Grid%20view&offset=${offset}&pageSize=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          },
        }
      );
      const newData = await response.json();
      newData.records.forEach((record) => {
        records.push(record.fields);
      });
      return recursiveFetch(newData.offset);
    };

    const data = await recursiveFetch(rawData.offset);
    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default generalAPI;
