// Get the list from json file fetched perdiodically from Etherscan
// Use cors-anywhere, maybe with heroku
const getLocalExchangeList = async () => {
  // Get the array from the json file
  const exchangeList = await fetch('./etherscan-exchanges.json');
  const exchangeListJson = await exchangeList.json();
  return exchangeListJson;
};

// Fetch the list periodically from Etherscan
/* const scrapeExchangeList = async () => {
  const rawUrl =
    'https://etherscan.io/accounts/label/exchange?subcatid=undefined&size=400&start=0&col=1&order=asc';

  // Fetch HTML of the page we want to scrape
  const data = await getRawData(rawUrl);
  return data;
};

const getRawData = (URL) => {
  fetch(URL, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
    .then((res) => {
      if (!res.ok) {
        console.log('Error: ', res.statusText);
        return;
      }
      return res.json();
    })
    .then((text) => console.log(text));
}; */

export { getLocalExchangeList };
