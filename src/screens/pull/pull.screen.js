import React from 'react';
import {useParams} from 'react-router-dom';

import Pull from 'components/pull/pull.component';

const PullScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Pull id={id} />
    </>
  );
};

export default PullScreen;
