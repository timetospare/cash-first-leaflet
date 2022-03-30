const API_URL = "https://geo-gql.now.sh/api";

const QUERY = `
query VenuesGetPostcode($postcode: String!) {
  postcode {
    suggest(prefix: $postcode) {
      id
      codes {
        laua
      }
      names {
        laua
      }
    }
  }
}
`;

// todo: make use of ./graphql-fetcher.js
const getPostcodeSuggestions = async (postcode) => {
  const res = await fetch(
    `${API_URL}?query=${QUERY}&variables=${JSON.stringify({ postcode })}`
  );
  const { data, errors } = await res.json();
  return { data, errors };
};

const fetchSuggestedPostcodes = (props) => {
  const { searchText } = props;
  if (searchText.length > 8) {
    return Promise.resolve().then(() => {
      throw new Error("Postcode Invalid");
    });
  } else if (searchText) {
    // setPostcodeError('');
    return getPostcodeSuggestions(searchText).then((data) => {
      console.log({ data });
      if (data.data !== null) {
        return data.data.postcode.suggest;
      } else {
        throw new Error("Postcode Invalid");
      }
    });
  }
};

export default fetchSuggestedPostcodes;
