import React from 'react';
import Repository from 'components/repository/repository.component';
import Search from 'components/search/search.component';

const REPOSITORY = 'divvydose/fe-coding-challenge';

const RepositoryScreen = () => {
  return (
    <>
      <Search repo={REPOSITORY} />
      <Repository repo={REPOSITORY} />
    </>
  );
};

export default RepositoryScreen;
