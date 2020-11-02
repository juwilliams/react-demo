import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {RepositoryProvider} from 'state/repository.state';

import RepositoryScreen from 'screens/repository/repository.screen';
import PullScreen from 'screens/pull/pull.screen';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <RepositoryProvider>
        <Router>
          <Route exact path="/repo/:repoId/pulls/:number" component={PullScreen} />
          <Route exact path="/" component={RepositoryScreen} />
        </Router>
      </RepositoryProvider>
    </div>
  );
};

export default App;
