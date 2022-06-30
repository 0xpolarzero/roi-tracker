import { useEffect, useState } from 'react';

import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import Avatar from './Avatar';
import Account from './Account';

const Profile = () => {
  const { user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [showAccount, setShowAccount] = useState(false);
  const [ensName, setEnsName] = useState(null);

  const getEnsName = async (address) => {
    try {
      const ensName = await Web3Api.resolve.resolveAddress({
        address: address,
      });
      setEnsName(ensName);
      console.log(ensName);
    } catch (error) {
      setEnsName(null);
      console.log('No ENS corresponding to this address', error);
    }
  };

  useEffect(() => {
    getEnsName(user.attributes.ethAddress);
  }, []);

  return (
    <div
      className='profile'
      onMouseEnter={() => setShowAccount(true)}
      onMouseLeave={() => setShowAccount(false)}
    >
      <Avatar
        className={showAccount ? 'avatar shrink' : 'avatar'}
        currentWallet={user.attributes}
        scale={4}
      />
      <Account visible={showAccount} ensName={ensName} />
    </div>
  );
};

export default Profile;
