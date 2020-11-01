import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {RepositoryProvider} from 'state/repository.state';

import RepositoryScreen from 'screens/repository/repository.screen';
import PullScreen from 'screens/pull/pull.screen';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Github Repository Pull Inspector</header>
      <RepositoryProvider>
        <Router>
          <Route exact path="/pulls/:id" component={PullScreen} />
          <Route exact path="/" component={RepositoryScreen} />
        </Router>
      </RepositoryProvider>
    </div>
  );
};

export default App;
