import React from 'react';
import Popup from '../Utils/Popup';

class TransfersConfig extends React.Component {
  constructor() {
    super();

    this.state = {
      isTransfersIgnored: true,
    };
  }

  toggleChange = () => {
    this.setState({
      isTransfersIgnored: !this.state.isTransfersIgnored,
    });
  };

  showInfo() {
    Popup.display(
      [
        `You can include tokens you held in one of your wallets during the last 30 days.`,
      ],
      '.fa-circle-info',
    );
  }

  hideInfo() {
    Popup.hide('#popup');
  }

  render() {
    const { ignoreTransfers, isTransfersIgnored } = this.props;
    return (
      <div className='transfers-config'>
        <div className='title'>Ignore deposits? </div>
        <div className='wrapper'>
          <div className='onoff'>
            <input
              type='checkbox'
              defaultChecked={isTransfersIgnored}
              onChange={ignoreTransfers}
              id='transfers-onoff-input'
            />
            <label htmlFor='transfers-onoff-input'></label>
            <i
              className='fa-solid fa-circle-info'
              onMouseEnter={this.showInfo}
              onMouseLeave={this.hideInfo}
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default TransfersConfig;
