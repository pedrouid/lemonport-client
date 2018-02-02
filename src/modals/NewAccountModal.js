import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import ButtonClose from '../components/ButtonClose';
import {
  dashboardGenerateAccount,
  dashboardImportAccount,
  dashboardAddAddress
} from '../reducers/_dashboard';
import { fonts, responsive } from '../styles';

const StyledForm = styled(Form)`
  @media screen and (${responsive.sm.min}) {
    padding: 20px;
    padding-top: 0;
  }
`;

const StyledOptions = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (${responsive.sm.min}) {
    padding: 20px;
  }
`;

const StyledButton = styled(Button)`
  font-weight: 500;
  @media screen and (${responsive.sm.max}) {
    font-size: ${fonts.size.small};
    font-weight: 700;
  }
`;

class NewAccountModal extends Component {
  state = {
    name: '',
    address: '',
    privateKey: '',
    mode: 'GENERATE_WALLET'
  };
  onGenerate = e => {
    e.preventDefault();
    this.props.dashboardGenerateAccount(this.state.name);
  };
  onImport = e => {
    e.preventDefault();
    this.props.dashboardImportAccount(this.state.name, this.state.address, this.state.privateKey);
  };
  onAddAddress = e => {
    e.preventDefault();
    this.props.dashboardAddAddress(this.state.name, this.state.address);
  };
  clearFields = () =>
    this.setState({ name: '', address: '', privateKey: '', mode: 'GENERATE_WALLET' });
  onClose = () => {
    this.clearFields();
    this.props.closeModal();
  };
  componentWillUnmount = () => {
    this.clearFields();
  };
  renderForm = () => {
    switch (this.state.mode) {
      case 'GENERATE_WALLET':
        return (
          <StyledForm onSubmit={this.onGenerate}>
            <h4>Generate new wallet</h4>
            <Input
              placeholder="Wallet Name (Optional)"
              type="text"
              value={this.state.name}
              onChange={({ target }) => this.setState({ name: target.value })}
            />
            <Button fetching={this.props.fetching} type="submit">
              Submit
            </Button>
          </StyledForm>
        );
      case 'IMPORT_WALLET':
        return (
          <StyledForm onSubmit={this.onImport}>
            <h4>Import wallet</h4>
            <Input
              placeholder="Wallet Name (Optional)"
              type="text"
              value={this.state.name}
              onChange={({ target }) => this.setState({ name: target.value })}
            />
            <Input
              placeholder="Public Address"
              type="text"
              value={this.state.address}
              onChange={({ target }) => this.setState({ address: target.value })}
            />
            <Input
              placeholder="Private Key"
              type="text"
              value={this.state.privateKey}
              onChange={({ target }) => this.setState({ privateKey: target.value })}
            />
            <Button fetching={this.props.fetching} type="submit">
              Submit
            </Button>
          </StyledForm>
        );
      case 'ADD_ADDRESS':
        return (
          <StyledForm onSubmit={this.onAddAddress}>
            <h4>Add Address</h4>
            <p>
              This will only store your address, this is called a <strong>Cold</strong> or{' '}
              <strong>Offline</strong> wallet
            </p>
            <p>You can view balances but you'll need your private key to send Ether or tokens</p>
            <Input
              placeholder="Wallet Name (Optional)"
              type="text"
              value={this.state.name}
              onChange={({ target }) => this.setState({ name: target.value })}
            />
            <Input
              placeholder="Public Address"
              type="text"
              value={this.state.address}
              onChange={({ target }) => this.setState({ address: target.value })}
            />
            <Button fetching={this.props.fetching} type="submit">
              Submit
            </Button>
          </StyledForm>
        );
      default:
        return;
    }
  };
  render = () => (
    <Card>
      <ButtonClose onClick={this.onClose} />
      <StyledOptions>
        <StyledButton dark onClick={() => this.setState({ mode: 'GENERATE_WALLET' })}>
          Generate New
        </StyledButton>
        <StyledButton dark onClick={() => this.setState({ mode: 'IMPORT_WALLET' })}>
          Import Wallet
        </StyledButton>
        <StyledButton dark onClick={() => this.setState({ mode: 'ADD_ADDRESS' })}>
          Add address
        </StyledButton>
      </StyledOptions>
      {this.renderForm()}
    </Card>
  );
}

NewAccountModal.propTypes = {
  dashboardGenerateAccount: PropTypes.func.isRequired,
  dashboardImportAccount: PropTypes.func.isRequired,
  dashboardAddAddress: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired
};

const reduxProps = ({ dashboard }) => ({
  fetching: dashboard.fetching
});

export default connect(reduxProps, {
  dashboardGenerateAccount,
  dashboardImportAccount,
  dashboardAddAddress
})(NewAccountModal);
