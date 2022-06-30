import { useEffect, useState } from 'react';

import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import Avatar from './Avatar';

const Profile = ({ web3 }) => {
  const { user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [showAccount, setShowAccount] = useState(false);
  const [ensName, setEnsName] = useState(null);

  const getEnsName = async (address) => {
    const options = { address: address };
    const ensName = await Web3Api.resolve.resolveAddress(options);
    console.log(ensName);
    const name = ensName ? ensName.name : user.attributes.ethAddress;
    setEnsName(ensName);
  };

  useEffect(() => {
    console.log(user.attributes);
    getEnsName(user.attributes.ethAddress);
  }, []);

  const getAccount = async () => {
    if (ensName) {
      return (
        <div className='account-id'>
          <div className='account-ens'>{ensName}</div>
          {/* <div className='account-address'>{account.address}</div> */}
        </div>
      );
    }

    // return <div className='account-id'>{account.address}</div>;
  };

  return (
    <div
      className='profile'
      onMouseEnter={() => setShowAccount(true)}
      onMouseLeave={() => setShowAccount(false)}
    >
      <Avatar currentWallet={user.attributes} scale={3} />
      <div>{showAccount && getAccount()}</div>
    </div>
  );
};

export default Profile;
