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
        `Ignore or not deposits from recognized trading plateforms in the calculation of the ROI.`,
        `e.g. With 'Ignore transfers' enabled, if you sent $100 from Coinbase to your wallet, it will just be ignored from the calculation.`,
        `If disabled, it will be considered as a $100 gain during your trades.`,
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
