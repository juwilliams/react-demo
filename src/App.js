import React from 'react';
import {RepositoryProvider} from 'state/repository.state';
import Repository from 'components/repository';

import './App.css';

const REPOSITORY = 'https://api.github.com/repos/divvydose/fe-coding-challenge';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Github Repository</header>
      <RepositoryProvider>
        <Repository path={REPOSITORY} />
      </RepositoryProvider>
    </div>
  );
};

export default App;
