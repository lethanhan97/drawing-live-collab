import React from 'react';
import styled from 'styled-components';
import LandingPage from '../LandingPage';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import DrawingPage from '../DrawingPage';

const AppStyled = styled.section`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppStyled>
      <Router>
        <Switch>
          <Route path="/login" component={LandingPage} />
          <Route path="/drawing" component={DrawingPage} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </AppStyled>
  );
}

export default App;
