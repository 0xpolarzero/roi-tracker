import React from 'react';

class AddressesConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { address, addresses, changeAddress, addAddress, removeAddress } =
      this.props;
    return (
      <div className='addresses-config'>
        <div className='addresses-list'>
          <i className='config-icon fa-solid fa-wallet'></i>
          <div className='title'>Wallet ({addresses.length})</div>
          <ul>
            {addresses.map((address) => {
              return (
                <li key={address}>
                  <span>{address}</span>
                  <button
                    onClick={removeAddress}
                    id={address}
                    className='fa-solid fa-trash-can'
                  ></button>
                </li>
              );
            })}
            <li>
              <input
                value={address}
                onChange={changeAddress}
                type='text'
                id='add-address'
                placeholder='Add an address'
              />
              <button onClick={addAddress}>Add</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default AddressesConfig;
