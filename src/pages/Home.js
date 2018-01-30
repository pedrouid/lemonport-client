import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Link from '../components/Link';
import Title from '../components/Title';
import Column from '../components/Column';
import BaseLayout from '../layout/base';

const StyledColumn = styled(Column)`
  & div,
  & h1,
  & h4 {
    margin: 10px;
  }
`;

const StyledFlex = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-around;
`;

const Home = () => (
  <BaseLayout>
    <StyledColumn>
      <Title>social cryptocurrency online payments platform</Title>
      <StyledFlex>
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </StyledFlex>
    </StyledColumn>
  </BaseLayout>
);

export default Home;