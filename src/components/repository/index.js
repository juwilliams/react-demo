import React, {useEffect} from 'react';
import {actions, useRepository} from 'state/repository.state';

import axios from 'axios';

const Repository = ({path}) => {
  const [state, dispatch] = useRepository();

  const {pulls} = state;

  const fetchPulls = async () => {
    const response = await axios(`${path}/pulls`);
    if (response && response.status === 200) {
      console.log('response', response);
      dispatch(actions.setRepositoryPulls(response.data));
    }
  };

  useEffect(() => {
    fetchPulls();
  }, []);

  return (
    <div className="repositories">
      <ul>
        {pulls &&
          pulls.map((pull) => (
            <li>
              <span>{pull.title}</span>
              <span>{pull.created_at}</span>
              {pull.labels?.map((label) => (
                <span>{label?.name}</span>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Repository;
