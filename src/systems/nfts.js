async function getNftExchanges(provider, startBlock, endBlock, addresses) {
  const currentNfts = await getCurrentNfts(provider, addresses);

  // const transactions = await getNftTransactions(
  //   provider,
  //   startBlock,
  //   endBlock,
  //   addresses,
  // );

  console.log(JSON.parse(currentNfts[0].metadata));
}

async function getNftTransactions(provider, startBlock, endBlock, addresses) {
  for (const address of addresses) {
    // const exchangesAddress = exchangesAll.result.filter(
    // exchanges.push(...exchangeForAddress.result);
    // exchanges.in.push(...exchangesInForAddress.transfers);
    // exchanges.out.push(...exchangesOutForAddress.transfers);
    // return exchanges;
  }
  // return exchangesAll;
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

export { getNftExchanges };
