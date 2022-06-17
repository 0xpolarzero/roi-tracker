import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const Profile = () => {
  const { data: account } = useAccount();

  const { data: ensName } = useEnsName({ address: account.address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (account)
    return (
      <div className='wallet-connect'>
        Connected to {ensName ?? account.address}
      </div>
    );
  return (
    <button className='wallet-connect' onClick={() => connect()}>
      <i className='fa-brands fa-ethereum connect-eth'></i> Connect
    </button>
  );
};

export default Profile;
