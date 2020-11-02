import React, {useEffect} from 'react';
import moment from 'moment';
import styled, {css} from 'styled-components';

import {fetchCommits} from 'api/github';

import {actions, useRepository} from 'state/repository.state';

const baseStyles = css`
  margin-bottom: 0.4rem;
`;

const sections = {
  root: styled.div``,
  title: styled.h5`
    font-size: 1rem;
    margin: 0 0 0.4rem 0;
  `,
  commit: styled.div`
    background-color: #eff5fb;
    border-radius: 6px;
    padding: 0.6rem 1rem;
  `,
  commitTitle: styled.h5``,
  commitMessage: styled.div`
    font-size: 0.9rem;
    font-weight: 500;
  `,
  commitAuthored: styled.div`
    display: flex;
  `,
  commitAuthor: styled.div`
    font-size: 0.8rem;
    color: #222;
    margin-right: 0.4rem;
  `,
  commitDate: styled.div`
    ${baseStyles};
    font-size: 0.8rem;
    color: #555;
  `,
};

export const Commit = ({data}) => {
  const {author, commit} = data;

  return (
    <sections.commit>
      <sections.commitMessage>{commit?.message}</sections.commitMessage>
      <sections.commitAuthored>
        <sections.commitAuthor>{author?.login}</sections.commitAuthor>
        <sections.commitDate>
          {'committed on '}
          {moment(commit?.committer?.date).format('MMM DD YYYY hh:mm:ss')} (
          {moment(commit?.committer?.date).fromNow()})
        </sections.commitDate>
      </sections.commitAuthored>
    </sections.commit>
  );
};

const Commits = ({url}) => {
  const [state, dispatch] = useRepository();

  const {isLoading, error, commits} = state;

  useEffect(() => {
    if (url && !commits && !isLoading) {
      fetchCommits({url, dispatch});
    }
    return () => dispatch(actions.setCommits(undefined));
  }, [isLoading, commits, dispatch, url]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops.. something went wrong.</div>;

  return (
    <sections.root>
      <sections.title>Commits</sections.title>
      {isLoading && <div>Fetching commits...</div>}
      {error && <div>{error}</div>}
      {commits?.map((data) => (
        <Commit key={data.commit.tree.sha} data={data} />
      ))}
    </sections.root>
  );
};

export default Commits;
