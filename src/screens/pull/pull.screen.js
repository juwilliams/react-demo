import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useRepository} from 'state/repository.state';

import {fetchBatchPullData} from 'api/github';

import Pull from 'components/pull/pull.component';

const PullScreen = () => {
  const {repoId, number} = useParams();
  const [state, dispatch] = useRepository();

  const {isLoading, error, pulls, commits} = state;
  const pull = pulls?.find((p) => p.number.toString() === number);

  useEffect(() => {
    fetchBatchPullData({repo: decodeURIComponent(repoId), dispatch, number});
  }, [dispatch, number, repoId]);

  if (isLoading || !pull) return <div>Loading...</div>;
  if (error) return <div>Oops.. something went wrong</div>;

  return <Pull repo={decodeURIComponent(repoId)} number={number} pull={pull} commits={commits} />;
};

export default PullScreen;
