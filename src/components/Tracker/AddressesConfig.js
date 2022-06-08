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
        <i className='addresses-icon fa-solid fa-wallet'></i>
        <input
          value={address}
          onChange={changeAddress}
          type='text'
          id='add-address'
          placeholder='Add an address'
        />
        <button onClick={addAddress}>Add</button>
        <div className='addresses-list'>
          <div className='title'>Wallet ({addresses.length})</div>
          <ul>
            {addresses.map((address) => {
              return (
                <li key={address}>
                  {address}
                  <button
                    onClick={removeAddress}
                    id={address}
                    className='fa-solid fa-trash-can'
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default AddressesConfig;
