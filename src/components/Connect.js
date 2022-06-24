import { useConnect } from 'wagmi';

const Connect = () => {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();

  return (
    <div className='connect-wallet'>
      <div className='header'>Connect your wallet to launch the app</div>
      <div className='connectors'>
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isConnecting &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}

        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
};

export default Connect;
