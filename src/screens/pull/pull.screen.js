import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useRepository} from 'state/repository.state';

import {fetchCommits, fetchPulls} from 'api/github';

import Pull from 'components/pull/pull.component';

const PullScreen = () => {
  const {repoId, id} = useParams();
  const [state, dispatch] = useRepository();

  const {isLoading, error, pulls, commits} = state;

  const pull = pulls?.find((p) => p.id.toString() === id);

  useEffect(() => {
    //  this is a deep linked request, we need to fetch pulls
    if (!pulls && !isLoading) {
      fetchPulls({repo: decodeURIComponent(repoId), dispatch});
    }
  }, [isLoading, dispatch, pulls, repoId]);

  useEffect(() => {
    console.log('pull', pull, 'commits', commits, 'isLoading', isLoading);
    if (pull && !commits && !isLoading) {
      fetchCommits({url: pull.commits_url, dispatch});
    }
  }, [isLoading, dispatch, commits, pull, repoId]);

  if (isLoading || !pull) return <div>Loading...</div>;
  if (error) return <div>Oops.. something went wrong</div>;

  return <Pull repo={decodeURIComponent(repoId)} id={id} pull={pull} commits={commits} />;
};

export default PullScreen;
