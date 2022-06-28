import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { setupClient } from './systems/wagmi-client-setup';

import App from './App';
import Home from './Home';

const Wrapper = ({ children }) => {
  return (
    <WagmiConfig client={setupClient()}>
      <BrowserRouter>{children}</BrowserRouter>
    </WagmiConfig>
  );
};

const renderWithRouting = (ui) => {
  return render(ui, { wrapper: Wrapper });
};

describe('Home component', () => {
  it('renders home', () => {
    // since screen does not have the container property, we'll destructure render to obtain container for this test
    const { container } = renderWithRouting(<Home />);
    expect(container).toMatchSnapshot();
  });
  it('renders correct heading', () => {
    const { getByRole } = renderWithRouting(<Home />);
    expect(getByRole('heading').textContent).toMatch(/go to app/i);
  });
});

describe('App component', () => {
  it('renders the app', () => {
    // since screen does not have the container property, we'll destructure render to obtain container for this test
    const { container } = renderWithRouting(<App />);
    expect(container).toMatchSnapshot();
  });
});

describe('Wallet connection buttons', () => {
  it('renders Metamask connector', () => {
    renderWithRouting(<App />);
    // Get all the buttons
    const buttons = screen.getAllByRole('button');
    // Check if there is a button with the text 'Connect'
    expect(buttons[0].textContent).toMatch(/Metamask/i);
  });
  it('renders Coinbase connector', () => {
    renderWithRouting(<App />);
    // Get all the buttons
    const buttons = screen.getAllByRole('button');
    // Check if there is a button with the text 'Connect'
    expect(buttons[1].textContent).toMatch(/Coinbase Wallet/i);
  });
  it('renders WalletConnect connector', () => {
    renderWithRouting(<App />);
    // Get all the buttons
    const buttons = screen.getAllByRole('button');
    // Check if there is a button with the text 'Connect'
    expect(buttons[2].textContent).toMatch(/WalletConnect/i);
  });
});

describe('Wallet connection system', () => {
  it('connects with Metamask', () => {
    renderWithRouting(<App />);
    // Get all the buttons
    const metamaskButton = screen.getByRole('button', { name: /Metamask/i });
    // Click the button with the text 'Connect'
    userEvent.click(metamaskButton);
    // Check if the wallet is connected
    expect(metamaskButton.textContent).toMatch('MetaMask (unsupported)');
  });
});
