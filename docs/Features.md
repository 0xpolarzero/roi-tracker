# Features

_This document shows the overall process for this tool to show the ROI of different wallets during a time period._

_It is more like a remainder for myself, of the different features I had to implement to get it to work._

## Operations

- **Let the user input their wallet addresses**
- Checking if each address is valid before adding it (Web3.js)
- **Let the user select a time period to look for**
- **Let the user choose if they want to include transfers in the calculation (deposit/withdraw to an exchange)**
- Finding the block that was mined at the beginning of this period (ethereum-block-by-date)
- Get the Ether balance of all addresses at this block, and at the current block
- Sum it to get a global ROI
- If _'Ignore transfers?'_ is checked :
  - Get all the transactions performed with the addresses during the time period
  - Scrape [Etherscan page of centralized exchanges](https://etherscan.io/accounts/label/exchange) to get their addresses
  - If any of the transactions was sent by one of these exchange addresses, balance its value in the ROI calculation
  - **_TODO_** FIND A WAY TO IDENTIFY AN EXCHANGE ADDRESS USED FOR DEPOSIT
- Get the global deposit/withdraw value
- Get the % of evolution during the period
- Show all values in USD as well - using the value fetched from Coingecko, also displayed in the header
  **_TODO_** LET THE USER CHOOSE THEIR CURRENCY
  **_TODO_** LET THE USER CONNECT THEIR WALLET (or regular login) AND SAVE WALLETS CONFIGURATIONS
