const convertLink = (url) => {
  if (url?.includes("https")) {
    return url;
  } else {
    return `https://${url}`;
  }
};

export default convertLink;
