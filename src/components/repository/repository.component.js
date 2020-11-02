import React from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import moment from 'moment';

const baseStyles = {
  pullData: css`
    display: inline-flex;
    margin: 0.6rem;
  `,
};
const sections = {
  root: styled.div`
    border: 2px solid #eee;
    border-radius: 6px;
    margin: 2rem 0;
    padding: 1rem 2rem;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
  `,
  header: styled.div``,
  title: styled.h5`
    font-size: 1.5rem;
    margin: 1rem 0;
  `,
  pulls: styled.ul`
    list-style: none;
    padding: 0;
    text-align: left;
  `,
  pull: styled.li`
    margin: 1rem 0;
  `,
  pullTitle: styled.div`
    ${baseStyles.pullData};
  `,
  pullCreatedAt: styled.div`
    ${baseStyles.pullData};
  `,
  pullLabel: styled.div`
    ${baseStyles.pullData};
    color: #fff;
    border-radius: 10px;
    background-color: #000086;
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
    margin: 0 1rem;
  `,
};

const Pull = ({repo, pull}) => {
  return (
    <sections.pull data-testid={pull.id}>
      <sections.pullTitle>
        <Link
          to={`/repo/${encodeURIComponent(repo)}/pulls/${pull.id}`}
          data-testid={`link-${pull.id}`}>
          {pull.title}
        </Link>
      </sections.pullTitle>
      <sections.pullCreatedAt>{moment(pull.created_at).fromNow()}</sections.pullCreatedAt>
      {pull.labels?.map((label) => (
        <sections.pullLabel key={`pull-labels-${label.id}`}>{label?.name}</sections.pullLabel>
      ))}
    </sections.pull>
  );
};

const Repository = ({repo, pulls}) => {
  return (
    <sections.root data-testid="repository">
      <sections.header>
        <sections.title>Pull Requests</sections.title>
      </sections.header>
      <sections.pulls>
        {pulls &&
          pulls.map((pull) => <Pull key={`pull-list-item-${pull.id}`} repo={repo} pull={pull} />)}
      </sections.pulls>
    </sections.root>
  );
};

export default Repository;
