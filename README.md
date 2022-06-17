# ROI Tracker

A basic tracking app for your wallets. It allows you to add different addresses (hot wallet, cold wallet, burn wallets, any kind of wallet) and trace your expanses to calculate the ROI in short periods of time : 1 hour, 1 day and 1 week.

It would consider transfers between wallets, gas spent, ETH/WETH swaps, buying/selling on various plateforms...

Demo not available yet, it's still fuzzy and nonfunctional :)

## Progress

| Status | Task                                                                                         |
| ------ | -------------------------------------------------------------------------------------------- |
| ✔️     | Let the user add addresses to gather the balance difference in the time period               |
| ✔️     | Let the user choose a custom time period or already configured (1hour, day or 1 week)        |
| ✔️     | Identify deposits from the list of transactions and list of major exchanges from Etherscan   |
| ✔️     | Let the user choose to ignore deposits from the final ROI calculation                        |
| ✔️     | Add wETH to the calculation and show the sum + each one)                                     |
| 𐄂      | Wallet connection (wagmi)                                                                    |
| 𐄂      | Save/load configurations & load address on wallet connection                                 |
| 𐄂      | Save configurations to Firebase, associated with address                                     |
| 𐄂      | Get a token info, value & contract based on a comprehensive list of tokens                   |
| 𐄂      | Get tokens owned by wallet & add it to the configuration, so the user can add them + save it |
| 𐄂      | Get NFTs owned by the addresses (ERC721 & ERC1155)                                           |
| 𐄂      | Track NFTs difference across wallets between start & end date                                |
| 𐄂      | Get NFTs floor price difference to calculate the ROI                                         |
| 𐄂      | Move Database to Express, MongoDB - refactor with NodeJS                                     |
| 𐄂      | Refactor App for a better display                                                            |
| 𐄂      | Change font - more nerdish                                                                   |
| 𐄂      | Create a homepage (Short context, features) - get the app to app.xxx.xyz                     |
