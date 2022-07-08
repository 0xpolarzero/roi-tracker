import { useEffect, useState } from 'react';

import { useMoralis } from 'react-moralis';
import { useMoralisWeb3Api } from 'react-moralis';

import AddressesConfig from './Config/Addresses';
import PeriodConfig from './Config/Period';
import TransfersConfig from './Config/Transfers';
import TokensConfig from './Config/Tokens';
import PresetsConfig from './Config/Presets';
import Header from '../components/Header/Header';
import { ResultHeader, ResultData } from './Data/Result';

import { displayNotif } from '../systems/utils';
import {
  getEthBalance,
  getTokenBalance,
  getCustomTokenBalance,
  isValidAddress,
} from '../systems/balance';
import { getDeposits } from '../systems/exchanges/exchanges';
import { TimestampConverter } from '../systems/timestamp';
import Connect from './Connect';

const Tracker = ({ web3, dater, ethPriceValue, isLogged }) => {
  // const { data: account } = useAccount();
  const { isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState({
    eth: {
      start: 0,
      end: 0,
    },
    token: [],
  });
  const [nft, setNft] = useState({
    in: [],
    out: [],
  });
  const [period, setPeriod] = useState({ from: '', to: '' });
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({
    progress: 0,
    message: '',
  });
  const [isTransfersIgnored, setIsTransfersIgnored] = useState(false);

  const [activeTokens, setActiveTokens] = useState([]);

  // MANAGING ADDRESSES

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const addAddress = (e) => {
    // Check if address is valid with Web3.js
    if (!isValidAddress(web3, address)) {
      displayNotif('error', 'Invalid address', 2000);
      return;
    }

    // Add the new address, only if it's not already in the array, considering lowercases
    if (
      addresses.findIndex((a) => a.toLowerCase() === address.toLowerCase()) ===
      -1
    ) {
      setAddresses([...addresses, address]);
    }

    setAddress('');

    displayNotif('info', 'Address added!', 2000);
  };

  const removeAddress = (e) => {
    setAddresses(addresses.filter((address) => address !== e.target.id));
    displayNotif('info', 'Address removed!', 2000);
  };

  const ignoreTransfers = (e) => {
    setIsTransfersIgnored(!isTransfersIgnored);
  };

  const getPeriod = (input, from, to) => {
    let startDate;
    let endDate;

    // Check at least one address
    if (addresses.length === 0) {
      displayNotif('error', 'No address selected', 2000);
      return;
    }

    if (input === 'custom') {
      // Check if the user filled both date fields
      if (from === '' || to === '') {
        displayNotif('error', 'Please fill both date fields', 2000);
        return;
      }
      // Check if the user has selected a valid date
      if (!from || !to) {
        displayNotif('error', 'Invalid date', 2000);
        return;
      }
      // Check if the user choose a valid period
      if (from > to) {
        displayNotif(
          'error',
          'Invalid period. Please select a start date that occurs before the end date.',
          2000,
        );
        return;
      }
      // Don't let the user select an end date in the future
      if (
        TimestampConverter().dateToTimestamp(to) > TimestampConverter().now() ||
        TimestampConverter().dateToTimestamp(from) > TimestampConverter().now()
      ) {
        displayNotif(
          'error',
          'Invalid date. I can\t yet predict the future...',
          2000,
        );
        return;
      }

      startDate = from;
      endDate = to;
    } else {
      if (input === 'lastHour') {
        // Get the period from last hour to current time
        startDate = TimestampConverter().lastHour();
      } else if (input === 'today') {
        // Get the period from midnight to current time
        startDate = TimestampConverter().today();
      } else if (input === 'lastWeek') {
        // Get the period from last week to current time
        startDate = TimestampConverter().lastWeek();
      }
      endDate = TimestampConverter().now();
    }

    return { startDate, endDate };
  };

  const gatherTokenBalance = async (
    startBlock,
    endBlock,
    walletAddresses,
    tokens,
  ) => {
    let tokenDataArray = [];

    if (!tokens) return null;

    for (const token of tokens) {
      let tokenData = {
        name: token.name,
        symbol: token.symbol,
        address: token.token_address,
      };

      const startBalance = await getTokenBalance(
        web3,
        Web3Api,
        startBlock,
        walletAddresses,
        token,
      );
      const endBalance = await getTokenBalance(
        web3,
        Web3Api,
        endBlock,
        walletAddresses,
        token,
      );

      tokenData.balance = {
        start: startBalance,
        end: endBalance,
      };

      tokenDataArray.push(tokenData);

      setLoadingProgress({ progress: 55 + 20 / tokens.length });
    }

    return tokenDataArray;
  };

  const trackROI = async (input, from, to) => {
    let balanceETH = {};

    const { startDate, endDate } = getPeriod(input, from, to);

    // Update Result component to show loading and initiate progress bar
    setLoading(true);
    setLoadingProgress({ progress: 0, message: 'Loading...' });
    setLoadingProgress({
      progress: 10,
      message: 'Loading blocks corresponding to timestamp.',
    });

    // Get the closest block corresponding to the dates
    const startBlock = await dater.getDate(startDate);
    const endBlock =
      to === TimestampConverter().now()
        ? { block: 'latest' }
        : await dater.getDate(endDate);

    setLoadingProgress({
      progress: 25,
      message: 'Loading ETH balance for each address at the beginning block.',
    });
    // Wait for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Get the balance in ETH at both start and end date
    balanceETH.start = await getEthBalance(
      web3,
      startBlock.block,
      addresses,
    ).catch((err) => {
      console.log(err);
      displayNotif('error', err.message, 2000);
    });

    setLoadingProgress({
      progress: 40,
      message: 'Loading ETH balance for each address at the end block.',
    });

    balanceETH.end = await getEthBalance(web3, endBlock.block, addresses).catch(
      (err) => {
        console.log(err);
        displayNotif('error', err.message, 2000);
      },
    );

    setLoadingProgress({
      progress: 55,
      message: 'Loading ERC20 tokens balance for each address.',
    });

    // Get the balance in WETH at both start and end date
    const balanceToken = await gatherTokenBalance(
      startBlock.block,
      endBlock.block,
      addresses,
      activeTokens,
      loadingProgress,
    );

    setLoadingProgress({
      progress: 75,
      message: 'Loading NFT tokens exchanges for each address.',
    });

    // const exchangesNft = await

    setPeriod({ from: startDate, to: endDate });
    setBalance({ eth: balanceETH, token: balanceToken });

    // Get the amount deposited from exchange plateforms during this period
    /* const deposits = isTransfersIgnored
      ? await getDeposits(web3, addresses, {
          start: startBlock.block,
          end: endBlock.block,
        })
      : 0; */

    setLoadingProgress({ progress: 100 });

    // Update deposits & tell Result component it's done loading
    // setDeposits(deposits);
    setLoading(false);
    setLoadingProgress({ progress: 0 });
  };

  // Get the connected account address if it exists
  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');

    if (isAuthenticated) {
      setAddresses([user.attributes.ethAddress]);
      // setLoggedAddress(account.address);
      // sort tokens by balance
      // Fetch all tokens in this account address
      // getCustomTokenBalance(web3);
      // Display loading in tokens container
      // const tokens = getAccountTokens();
      // displayTokens(tokens); // Include remove loading
    }
  }, [isAuthenticated, isLogged, isWeb3Enabled]);

  if (!isAuthenticated || !isLogged) {
    return <Connect isLogged={isLogged} />;
  }

  if (isAuthenticated && isLogged) {
    return (
      <div className='tracker'>
        <Header ethPriceValue={ethPriceValue} />

        <PresetsConfig />

        {/* <div className='config-wrapper'> */}
        <AddressesConfig
          address={address}
          addresses={addresses}
          changeAddress={changeAddress}
          addAddress={addAddress}
          removeAddress={removeAddress}
        />

        <TokensConfig
          dater={dater}
          addresses={addresses}
          activeTokens={activeTokens}
          setActiveTokens={setActiveTokens}
        />

        <PeriodConfig trackROI={trackROI} />
        {/* <div className='separator'></div>
            <TransfersConfig
              ignoreTransfers={ignoreTransfers}
              isTransfersIgnored={isTransfersIgnored}
            /> */}
        {/* </div> */}

        <ResultHeader period={period} />

        <ResultData
          period={period}
          balance={balance}
          deposits={deposits}
          loading={loading}
          loadingProgress={loadingProgress}
          ethPriceValue={ethPriceValue}
        />
      </div>
    );
  }
};

export default Tracker;
