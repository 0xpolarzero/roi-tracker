import { useEffect, useState } from 'react';

import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';

const Profile = () => {
  const { data: account } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address });
  const { data: ensName } = useEnsName({ address: account?.address });

  return (
    <div>
      {/* <img src={ensAvatar} alt='ENS Avatar' />
      <div>{ensName ? `${ensName} (${account.address})` : account.address}</div>
      <div>Connected to {account.connector.name}</div> */}
      profile
    </div>
  );
};

export default Profile;
