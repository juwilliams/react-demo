import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {actions, useRepository} from 'state/repository.state';

import axios from 'axios';

const GITHUB_REPO_API_URI = 'https://api.github.com/repos';

const Repository = ({repo}) => {
  const [state, dispatch] = useRepository();

  const {filter, pulls} = state;

  useEffect(() => {
    const fetchPulls = async () => {
      try {
        dispatch(actions.setLoading(true));
        const response = await axios(`${GITHUB_REPO_API_URI}/${repo}/pulls?q=${filter}`);
        if (response && response.status === 200) {
          console.log('response', response);
          dispatch(actions.setRepositoryPulls(response.data));
        }
      } catch (err) {
        dispatch(actions.setError(err));
      } finally {
        dispatch(actions.setLoading(false));
      }
    };

    fetchPulls();
  }, [filter, dispatch, repo]);

  return (
    <div className="repositories">
      <ul>
        {pulls &&
          pulls.map((pull) => (
            <li key={`pull-list-item-${pull.id}`}>
              <span>
                <Link to={`/pulls/${pull.id}`}>{pull.title}</Link>
              </span>
              <span>{pull.created_at}</span>
              {pull.labels?.map((label) => (
                <span key={`pull-labels-${label.id}`}>{label?.name}</span>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Repository;
