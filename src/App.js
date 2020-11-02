import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {RepositoryProvider} from 'state/repository.state';

import RepositoryScreen from 'screens/repository/repository.screen';
import PullScreen from 'screens/pull/pull.screen';

import {theme} from 'theme';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RepositoryProvider>
          <Router>
            <Route exact path="/pulls/:id" component={PullScreen} />
            <Route exact path="/" component={RepositoryScreen} />
          </Router>
        </RepositoryProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
