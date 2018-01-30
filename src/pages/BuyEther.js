import React, { Component } from 'react';
import styled from 'styled-components';
import Reload from '../components/Reload';
import BaseLayout from '../layout/base';
import Title from '../components/Title';
import Link from '../components/Link';
import { getSession } from '../helpers/utilities';
import { colors, transitions, fonts } from '../styles';

const StyledWrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  position: relative;
  height: 200px;
`;

const StyledLink = styled(Link)`
  transition: ${transitions.base};
  display: block;
  border: none;
  border-style: none;
  box-sizing: border-box;
  background: transparent;
  color: rgb(${colors.dark});
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.normal};
  margin: 5px;
  cursor: pointer;
  will-change: transform;

  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }
`;

const StyledActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

class BuyEther extends Component {
  state = {
    email: getSession() ? getSession().email : '',
    address: getSession() ? getSession().accounts[0].address : {}
  };
  onReceiveMessage = e => {
    if (e.origin === 'https://buy.coinbase.com') {
      if (e.data.status === 'buy_completed') {
        console.log('buy_completed');
        // TODO
        // Success message and redirect to dashboard
      } else if (e.data.status === 'buy_canceled') {
        console.log('buy_canceled');
        // TODO
        // Handle canceled purchase
      }
      return;
    }
  };
  componentWillMount() {
    window.addEventListener('message', this.onReceiveMessage, false);

    const script = document.createElement('script');
    script.src = 'https://use.typekit.net/foobar.js';
    script.async = true;
    var url = 'https://buy.coinbase.com/static/widget.js';
    script.src =
      url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ref=' + encodeURIComponent(window.location.href);

    document.body.appendChild(script);
  }
  render() {
    return (
      <BaseLayout>
        {!!this.state.address ? (
          <StyledWrapper>
            <Title>Don't have Ether yet?</Title>
            <a
              className="coinbase-widget"
              id="coinbase_widget"
              data-prefill_email={this.state.email}
              data-address={this.state.address}
              data-amount="50"
              data-code="f186b745-bf67-52e8-a9f1-cdaf829991a5"
              data-currency="USD"
              data-crypto_currency="ETH"
              href=""
            >
              Buy ETH with Coinbase
            </a>
            <StyledActions>
              <StyledLink to="/dashboard">Skip</StyledLink>
            </StyledActions>
          </StyledWrapper>
        ) : (
          <StyledWrapper>
            <Title>Failed to load</Title>
            <Reload onClick={() => window.location.reload()} />
          </StyledWrapper>
        )}
      </BaseLayout>
    );
  }
}

export default BuyEther;