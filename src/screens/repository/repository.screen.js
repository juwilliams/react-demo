import React from 'react';
import Repository from 'components/repository/repository.component';
import Search from 'components/search/search.component';

const REPOSITORY = 'https://api.github.com/repos/divvydose/fe-coding-challenge';

const RepositoryScreen = () => {
  return (
    <>
      <Search />
      <Repository path={REPOSITORY} />
    </>
  );
};

export default RepositoryScreen;
