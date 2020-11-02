import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {useRepository} from 'state/repository.state';
import {fetchPulls} from 'api/github';

import Commits from 'components/commits/commits.component';
const baseStyles = css`
  padding: 1rem;
`;
const sections = {
  root: styled.div`
    display: inline-flex;
    flex-direction: column;
    text-align: left;
    border: 1px solid #ebebeb;
    border-radius: 6px;
    margin-top: 1rem;
    min-width: 320px;
    max-width: 800px;
  `,
  title: styled.div`
    ${baseStyles};
    background-color: #f5f5f5;
    font-weight: 700;
  `,
  body: styled.div`
    ${baseStyles};
    border-bottom: 1px solid #ebebeb;
  `,
  commits: styled.div`
    ${baseStyles};
  `,
};

const Pull = ({repo, id}) => {
  const [state, dispatch] = useRepository();

  const {isLoading, error, pulls} = state;

  const pull = pulls?.find((p) => p.id.toString() === id);

  useEffect(() => {
    //  this is a deep linked request, we need to fetch pulls
    if (!pulls && !isLoading) {
      fetchPulls({repo, dispatch});
    }
  }, [isLoading, dispatch, pulls, repo]);

  if (isLoading || !pull) return <div>Loading...</div>;
  if (error) return <div>Oops.. something went wrong</div>;

  return (
    <sections.root>
      <sections.title>{pull.title}</sections.title>
      <sections.body>{pull.body}</sections.body>
      <sections.commits>
        <Commits url={pull.commits_url} />
      </sections.commits>
    </sections.root>
  );
};

export default Pull;
