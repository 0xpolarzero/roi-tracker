import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { fetchData } from './utils';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

async function getTransactions() {
  const transactions = await web3.alchemy.getAssetTransfers({
    fromBlock: '0x0',
    fromAddress: '0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12',
  });

  const scanTransactions = await fetchData(
    `https://api.etherscan.io/api?module=account&action=txlist&address=0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`,
  );
  console.log(scanTransactions);

  const timestamp = '1653899823';
  const date = new Date(timestamp * 1000);
  console.log(date);
}

const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getTransactions, isValidAddress };
