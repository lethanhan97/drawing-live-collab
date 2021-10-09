import React from 'react';
import styled from 'styled-components';
import LandingPage from '../LandingPage';

const AppStyled = styled.section`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppStyled>
      <LandingPage></LandingPage>
    </AppStyled>
  );
}

export default App;
