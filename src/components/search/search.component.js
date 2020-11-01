import React, {useState} from 'react';
import {actions, useRepositoryDispatch} from 'state/repository.state';

import axios from 'axios';

const SEARCH_URL = 'https://api.github.com/search/issues';

const Search = ({repo}) => {
  const dispatch = useRepositoryDispatch();
  const [searchTerm, setSearchTerm] = useState(undefined);

  const fetchSearchResults = async () => {
    try {
      const response = await axios(`${SEARCH_URL}?q=repo:${repo}+${searchTerm}&type=pr`);
      if (response && response.status === 200) {
        dispatch(actions.setRepositoryPulls(response.data.items));
      }
    } catch (err) {
      console.log('search error', err);
    }
  };

  const handleFilterPullsClick = () => {
    fetchSearchResults();
  };

  const handleResetFilterClick = () => {
    setSearchTerm(undefined);
    fetchSearchResults();
  };

  return (
    <>
      <div>
        <label htmlFor="searchTerm">Pull Requests</label>
        <input
          id="searchTerm"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="something+in:title"
        />
        <input type="button" value="Filter" onClick={handleFilterPullsClick} />
        <input type="button" value="Reset" onClick={handleResetFilterClick} />
      </div>
      <a
        target="window"
        href="https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-issues-and-pull-requests">
        Search Details
      </a>
    </>
  );
};

export default Search;
