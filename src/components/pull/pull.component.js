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
