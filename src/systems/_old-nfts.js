import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const provider = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/demo`);

async function getNftExchanges(startBlock, endBlock, addresses) {
  const transactions = await getNftTransactions(
    startBlock,
    endBlock,
    addresses,
  );
  // Remove a transaction if it went in & out during the period
    const exchanges = transactions.in.filter((tx) => {
        return transactions.out.find((outTx) => {
            return tx.id === outTx.id;
        });
    }))

  console.log(exchanges);
}

async function getNftTransactions(startBlock, endBlock, addresses) {
  let exchanges = { in: [], out: [] };

  for (const address of addresses) {
    const exchangesInForAddress = await provider.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      toBlock: endBlock.block,
      toAddress: address,
      order: 'desc',
      category: ['erc721', 'erc1155'],
      withMetaData: true,
    });

    const exchangesOutForAddress = await provider.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      toBlock: endBlock.block,
      fromAddress: address,
      order: 'desc',
      category: ['erc721', 'erc1155'],
      withMetaData: true,
    });

    exchanges.in.push(...exchangesInForAddress.transfers);
    exchanges.out.push(...exchangesOutForAddress.transfers);

    return exchanges;
  }
}

export { getNftExchanges };
