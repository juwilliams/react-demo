import React from 'react';
import {useParams} from 'react-router-dom';

import Pull from 'components/pull/pull.component';

const PullScreen = () => {
  const {repoId, id} = useParams();
  return (
    <>
      <Pull repo={decodeURIComponent(repoId)} id={id} />
    </>
  );
};

export default PullScreen;
