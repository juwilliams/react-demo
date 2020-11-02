import axios from 'axios';
import {actions} from 'state/repository.state';

const GITHUB_REPO_API_URI = 'https://api.github.com/repos';

export const fetchPulls = async ({repo, filter, dispatch}) => {
  try {
    dispatch(actions.setLoading(true));
    const response = await axios(`${GITHUB_REPO_API_URI}/${repo}/pulls?q=${filter}`);
    if (response && response.status === 200) {
      dispatch(actions.setRepositoryPulls(response.data));
    }
  } catch (err) {
    dispatch(actions.setError(err));
  } finally {
    dispatch(actions.setLoading(false));
  }
};

export const fetchCommits = async ({url, dispatch}) => {
  try {
    dispatch(actions.setLoading(true));
    const response = await axios(url);
    if (response && response.status === 200) {
      dispatch(actions.setCommits(response.data));
    }
  } catch (err) {
    actions.setError('Looks like something went wrong fetching commits..');
  } finally {
    dispatch(actions.setLoading(false));
  }
};
