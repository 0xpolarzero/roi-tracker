import { useEffect, useState } from 'react';

import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

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
  let ensAvatar;

  useEffect(() => {
    getEnsName(user.attributes.ethAddress);
  });

  const avatar = ensAvatar ? (
    <img src={ensAvatar} alt='ENS Avatar' />
  ) : (
    <i className='fa-solid fa-user'></i>
  );

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
      <div>{showAccount && getAccount()}</div>
      {/* <div>Connected to {account.connector.name}</div> */}
    </div>
  );
};

export default Profile;
