import { useEffect, useState } from 'react';

const Profile = ({ web3 }) => {
  let ensAvatar;
  let ensName;

  const [showAccount, setShowAccount] = useState(false);

  const avatar = ensAvatar ? (
    <img src={ensAvatar} alt='ENS Avatar' />
  ) : (
    <i className='fa-solid fa-user'></i>
  );

  const getAccount = () => {
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
