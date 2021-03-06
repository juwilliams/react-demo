import axios from 'axios';
import {actions} from 'state/repository.state';

const GITHUB_REPO_API_URI = 'https://api.github.com/repos';
const GITHUB_ISSUE_SEARCH_URL = 'https://api.github.com/search/issues';

export const fetchPulls = async ({repo, dispatch}) => {
  try {
    dispatch(actions.setLoading(true));
    const response = await axios(`${GITHUB_REPO_API_URI}/${repo}/pulls`);
    if (response && response.status === 200) {
      dispatch(actions.setRepositoryPulls(response.data));
    }
  } catch (err) {
    dispatch(actions.setError(err));
  } finally {
    dispatch(actions.setLoading(false));
  }
};

export const fetchPullsByFilter = async ({filter, dispatch}) => {
  try {
    dispatch(actions.setLoading(true));
    const response = await axios(`${GITHUB_ISSUE_SEARCH_URL}?q=${filter}`);
    if (response && response.status === 200) {
      dispatch(actions.setRepositoryPulls(response.data.items));
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

//  preferably this would be a batch API, need to aggregate these due to the
//  model for commits/pulls
export const fetchBatchPullData = async ({repo, dispatch, number}) => {
  try {
    dispatch(actions.setLoading(true));
    const pullsResponse = await axios(`${GITHUB_REPO_API_URI}/${repo}/pulls`);

    //  we've got pulls, find a matching pull by id
    if (pullsResponse && pullsResponse.status === 200) {
      const pull = pullsResponse?.data?.find((p) => p.number.toString() === number);

      //  a matching pull was found, let's grab the commits for it
      if (pull) {
        const commitsResponse = await axios(pull.commits_url);

        if (commitsResponse && commitsResponse.status === 200) {
          dispatch(actions.setCommits(commitsResponse.data));
        }
      }
      dispatch(actions.setRepositoryPulls(pullsResponse.data));
    }
  } catch (err) {
    dispatch(actions.setError(err));
  } finally {
    dispatch(actions.setLoading(false));
  }
};
