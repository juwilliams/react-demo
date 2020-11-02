import React from 'react';
import styled, {css} from 'styled-components';

import {useRepository} from 'state/repository.state';

import Commits from 'components/commits/commits.component';
const baseStyles = css`
  padding: 1rem;
`;
const sections = {
  root: styled.div`
    display: inline-flex;
    flex-direction: column;
    text-align: left;
    border: 2px solid #eee;
    border-radius: 6px;
    margin-top: 1rem;
  `,
  title: styled.div`
    ${baseStyles};
    background-color: #eee;
  `,
  body: styled.div`
    ${baseStyles};
    border-bottom: 1px solid #eee;
  `,
  commits: styled.div`
    ${baseStyles};
  `,
};

const Pull = ({id}) => {
  const [state] = useRepository();

  const {pulls} = state;

  const pull = pulls?.find((p) => p.id.toString() === id);
  if (!pull) return <div>No Pull Data</div>;

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
