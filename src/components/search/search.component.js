import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {actions, useRepositoryDispatch} from 'state/repository.state';

const SEARCH_URL = 'https://api.github.com/search/issues';

const sections = {
  root: styled.div`
    background-color: #282c34;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
  `,
  searchControls: styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-end;
      align-self: center;
    }
  `,
  filter: styled.input`
    border: 1px solid #bbb;
    border-radius: 6px;
    background-color: #282c34;
    color: #fff;
    padding: 0.4rem 1rem;
    margin: 0.4rem 0 0.4rem 0;
    height: 1.2rem;
    min-width: 320px;
    line-height: 1.2rem;

    @media (max-width: 420px) {
      justify-self: center;
      min-width: 300px;
    }
  `,
  buttons: styled.div``,
  button: styled.input`
    height: 2rem;
    width: 4rem;
    background-color: #282c34;
    color: #fff;
    border: 1px solid #bbb;
    border-radius: 6px;
    margin: 0 0.2rem;
  `,
  searchInfo: styled.a`
    color: #fff;
    font-size: 0.8rem;

    @media (max-width: 420px) {
      justify-self: flex-start;
    }
  `,
};

const Search = ({repo}) => {
  const dispatch = useRepositoryDispatch();
  const [searchTerm, setSearchTerm] = useState(undefined);

  const fetchSearchResults = async (query) => {
    try {
      let response;

      if (query) {
        response = await axios(`${SEARCH_URL}?q=repo:${repo}+${query}&type=pr`);
      } else {
        response = await axios(`${SEARCH_URL}?q=repo:${repo}&type=pr`);
      }

      if (response && response.status === 200) {
        dispatch(actions.setRepositoryPulls(response.data.items));
      }
    } catch (err) {
      console.log('search error', err);
    }
  };

  const handleFilterPullsClick = () => {
    fetchSearchResults(searchTerm);
  };

  const handleResetFilterClick = () => {
    fetchSearchResults(undefined);
  };

  return (
    <sections.root>
      <sections.searchControls>
        <sections.filter
          id="searchTerm"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="something+in:title"
        />
        <sections.buttons>
          <sections.button type="button" value="Filter" onClick={handleFilterPullsClick} />
          <sections.button type="button" value="Reset" onClick={handleResetFilterClick} />
        </sections.buttons>
      </sections.searchControls>
      <sections.searchInfo
        target="window"
        href="https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-issues-and-pull-requests">
        Search Information
      </sections.searchInfo>
    </sections.root>
  );
};

export default Search;
