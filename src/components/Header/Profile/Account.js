import { useMoralis } from 'react-moralis';

import { shrinkAddress } from '../../../systems/utils';

const Account = ({ visible, ensName }) => {
  const { user } = useMoralis();

  const address = shrinkAddress(user.attributes.ethAddress);

  if (!visible) {
    return <div className='account-id hidden'></div>;
  }

  if (ensName) {
    return (
      <div className='account-id'>
        <div className='account-main'>{ensName.name}</div>
        <div className='account-sub'>{address}</div>
      </div>
    );
  }

  return (
    <div className='account-id'>
      <div className='account-main'>{address}</div>
    </div>
  );
};

export default Account;
