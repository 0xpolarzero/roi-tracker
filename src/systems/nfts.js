import { createAlchemyWeb3 } from '@alch/alchemy-web3';

import { displayNotif } from './utils';

const web3 = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/demo`);

async function getNftExchanges(provider, startBlock, endBlock, addresses) {
  const currentNfts = await getCurrentNfts(provider, addresses).catch((err) => {
    console.log(err);
    displayNotif('error', 'We could not load your current NFTs.', 4000);
  });

  const transactions = await getNftTransactions(
    provider,
    startBlock,
    endBlock,
    addresses,
  ).catch((err) => {
    console.log(err);
    displayNotif(
      'error',
      'There was an issue fetching the NFT exchanges with your addresses.',
      4000,
    );
  });

  // Exclude local transactions corresponding to a transfer between addresses
  if (transactions) {
    transactions.filter((txn) => {
      return !(addresses?.includes(txn.from) && addresses?.includes(txn.to));
    });
  }
}

async function getCurrentNfts(provider, addresses) {
  let currentNfts = [];

  for (const address of addresses) {
    const currentNft = await provider.account.getNFTs({
      address: address,
    });
    currentNfts.push(...currentNft.result);
  }

  return currentNfts;
}

async function getNftTransactions(provider, startBlock, endBlock, addresses) {
  let exchanges = [];

  for (const address of addresses) {
    const exchangesInForAddress = await web3.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      toBlock: endBlock.block,
      toAddress: address,
      order: 'desc',
      category: ['erc721', 'erc1155'],
      withMetaData: true,
    });

    const exchangesOutForAddress = await web3.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      toBlock: endBlock.block,
      fromAddress: address,
      order: 'desc',
      category: ['erc721', 'erc1155'],
      withMetaData: true,
    });

    exchanges.push(
      ...exchangesInForAddress.transfers,
      ...exchangesOutForAddress.transfers,
    );
  }

  return exchanges;
}

export { getNftExchanges };
