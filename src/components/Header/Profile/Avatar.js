import { useMoralis } from 'react-moralis';

import Blockies from 'react-blockies';
import { Skeleton } from 'antd';
import { useEffect } from 'react';

const Avatar = (user) => {
  const { isAuthenticated } = useMoralis();

  if (!user.ethAddress && !isAuthenticated)
    return <Skeleton.Avatar active size={40} />;

  return <Blockies seed={user.ethAddress} className='blockies' {...user} />;
};

export default Avatar;
