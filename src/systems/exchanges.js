import { fetchData } from '../utils/utils';

const getExchangeAddresses = async () => {
  const url =
    'https://etherscan.io/accounts/label/exchange?subcatid=undefined&size=400&start=0&col=1&order=asc';
  const url2 = 'https://en.wikipedia.org/wiki/Cricket_World_Cup';

  const response = await getRawData(url2);
  console.log(response);
  console.log('test');
};

const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

export { getExchangeAddresses };