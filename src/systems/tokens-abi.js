async function getTokenBalance(provider, walletAddress, tokenAddress) {
  const contract = new provider.eth.Contract(minABI, tokenAddress);

  const tokenBalance = await contract.methods.balanceOf(walletAddress).call();
  // Format balance in ether
  const tokenBalanceInEth = provider.utils.fromWei(tokenBalance, 'ether');

  console.log(tokenBalanceInEth);
}

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

export { getTokenBalance };
