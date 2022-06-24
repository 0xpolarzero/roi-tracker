import { useEffect, useState } from 'react';

import { useAccount } from 'wagmi';

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
  getTokenAddress,
  isValidAddress,
} from '../systems/balance';
import { getDeposits } from '../systems/exchanges/exchanges';
import { TimestampConverter } from '../systems/timestamp';
import Connect from './Connect';

const Tracker = ({ web3, dater, ethPriceValue }) => {
  const { data: account } = useAccount();
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState({
    eth: {
      start: 0,
      end: 0,
    },
    weth: {
      start: 0,
      end: 0,
    },
  });
  const [period, setPeriod] = useState({ from: '', to: '' });
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransfersIgnored, setIsTransfersIgnored] = useState(false);

  // MANAGING ADDRESSES

  useEffect(() => {
    console.log(ethPriceValue);
  }, [ethPriceValue]);

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const addAddress = (e) => {
    // Check if address is valid with Web3.js
    if (!isValidAddress(web3, address)) {
      displayNotif('error', 'Invalid address', 2000);
      return;
    }

    setAddresses(
      Array.from(new Set([...this.state.addresses, this.state.address])),
    );
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

  const trackROI = async (input, from, to) => {
    let balanceETH = {};
    let balanceWETH = {};

    const { startDate, endDate } = getPeriod(input, from, to);

    // Update Result component to show loading and initiate progress bar
    setLoading(true);
    setLoadingProgress(0);
    setLoadingProgress(10);

    // Get the closest block corresponding to the dates
    const startBlock = await dater.getDate(startDate);
    const endBlock =
      to === TimestampConverter().now()
        ? { block: 'latest' }
        : await dater.getDate(endDate);

    setLoadingProgress(25);

    // Get the balance in ETH at both start and end date
    balanceETH.start = await getEthBalance(
      web3,
      startBlock.block,
      addresses,
    ).catch((err) => {
      console.log(err);
      displayNotif('error', err.message, 2000);
    });

    setLoadingProgress(40);

    balanceETH.end = await getEthBalance(web3, endBlock.block, addresses).catch(
      (err) => {
        console.log(err);
        displayNotif('error', err.message, 2000);
      },
    );

    setLoadingProgress(55);

    // Get the balance in WETH at both start and end date
    balanceWETH.start = await getTokenBalance(
      web3,
      startBlock.block,
      addresses,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    );

    setLoadingProgress(75);

    balanceWETH.end = await getTokenBalance(
      web3,
      endBlock.block,
      addresses,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    );

    setPeriod({ from: startDate, to: endDate });
    setBalance({ eth: balanceETH, weth: balanceWETH });

    setLoadingProgress(95);

    // Get the balance for other tokens
    const testToken = getTokenAddress(web3, 'WETH');
    console.log(testToken);

    // Get the amount deposited from exchange plateforms during this period
    const deposits = isTransfersIgnored
      ? await getDeposits(web3, addresses, {
          start: startBlock.block,
          end: endBlock.block,
        })
      : 0;

    setLoadingProgress(100);

    // Update deposits & tell Result component it's done loading
    setDeposits(deposits);
    setLoading(false);
    setLoadingProgress(0);
  };

  useEffect(() => {
    setAddresses(['0x02c2adbdB7c0C1037B5278626A78B6c71787dFe8']);
    setAddress('');
  }, []);

  if (account) {
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

        <TokensConfig />

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

  return <Connect />;
};

export default Tracker;
