import React from 'react';
import {useRepository} from 'state/repository.state';

import Commits from 'components/commits/commits.component';

const Pull = ({id}) => {
  const [state] = useRepository();

  const {pulls} = state;

  const pull = pulls?.find((p) => p.id.toString() === id);
  if (!pull) return <div>No Pull Data</div>;
  console.log('pull', pull);
  return (
    <>
      <div>{pull.title}</div>
      <div>{pull.body}</div>
      <Commits url={pull.commits_url} />
    </>
  );
};

export default Pull;
