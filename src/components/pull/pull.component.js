import React from 'react';
import styled, {css} from 'styled-components';

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

const Pull = ({pull, commits}) => {
  return (
    <sections.root>
      <sections.title data-testid="pull-title">{pull.title}</sections.title>
      <sections.body data-testid="pull-body">{pull.body}</sections.body>
      <sections.commits data-testid="pull-commits">
        <Commits url={pull.commits_url} commits={commits} />
      </sections.commits>
    </sections.root>
  );
};

export default Pull;
