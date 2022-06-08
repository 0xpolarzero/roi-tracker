import React from 'react';

class AddressesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { addresses, removeAddress } = this.props;
    return (
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
    );
  }
}
export default AddressesList;
