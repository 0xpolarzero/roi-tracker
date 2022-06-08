import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { fetchData } from './utils';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

async function getTransactions(from, to) {
  const transactions = await web3.eth.getTransaction(
    '0xaf2d16ca950c6bad57f33d71802a3e68d84a62217d5f633ade5243780c4af7c4',
  );
  const input = web3.utils.hexToAscii(transactions.input);
  console.log(input);
  console.log(transactions);

  const scanTransactions = await fetchData(
    `https://api.etherscan.io/api?module=account&action=txlist&address=0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`,
  );
}

const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getTransactions, isValidAddress };
