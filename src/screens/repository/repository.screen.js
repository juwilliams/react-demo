import React, {useEffect} from 'react';

import Repository from 'components/repository/repository.component';
import Search from 'components/search/search.component';

import {fetchPulls} from 'api/github';
import {useRepository} from 'state/repository.state';

const REPOSITORY = 'divvydose/fe-coding-challenge';

const RepositoryScreen = () => {
  const [state, dispatch] = useRepository();

  const {isLoading, error, filter, pulls} = state;

  useEffect(() => {
    fetchPulls({repo: REPOSITORY, dispatch});
  }, [filter, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops.. something went wrong</div>;

  return (
    <>
      <Search repo={REPOSITORY} />
      <Repository repo={REPOSITORY} pulls={pulls} />
    </>
  );
};

export default RepositoryScreen;
