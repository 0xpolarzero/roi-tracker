import { fetchData } from '../utils/utils';
import { load as loadFromCheerio } from 'cheerio';

const getDeposits = async (provider, addresses, block) => {
  // Get all transactions received by this address during this period
  const transactions = await getTransactions(provider, addresses, block);
  // Get a list of addresses owned by major exchanges
  const exchanges = await getExchangeAddresses();
  console.log(exchanges);

  // Keep only transactions sent by these exchanges
  const filteredTransactions = transactions.filter((transaction) => {
    const isExchange = exchanges.includes(transaction.from);
    return isExchange;
  });
};

const getTransactions = async (provider, addresses, block) => {
  let totalTransactions = [];

  for (const address of addresses) {
    const transactions = await provider.alchemy.getAssetTransfers({
      toAddress: address,
      fromBlock: block.start,
      toBlock: block.end,
    });
    totalTransactions = [...totalTransactions, ...transactions.transfers];
  }

  return totalTransactions;
};

const getExchangeAddresses = async () => {
  const url =
    'https://etherscan.io/accounts/label/exchange?subcatid=undefined&size=400&start=0&col=1&order=asc';

  const data = await getRawData(url);
  const parsedData = loadFromCheerio(data);
  const choice = parsedData('*');
  console.log(choice);

  const selectedData = parsedData('#table-subcatid-0 > tbody > tr');
  console.log(selectedData);

  const addresses = selectedData.map((row) => {
    const address = row.children[1].children[0].attribs.href.split('/')[2];
    return address;
  });

  console.log(parsedData('body').html());

  return selectedData;
};

const getRawData = (URL) => {
  return fetch(URL, { mode: 'no-cors' }).then((data) => {
    return data;
  });
};

export { getDeposits };
