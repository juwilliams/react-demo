import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const sections = {
  root: styled.div``,
};

export const Commit = ({data}) => {
  const {author, commit} = data;

  return (
    <div>
      <div>{author?.login}</div>
      <div>{commit?.message}</div>
      <div>{commit?.committer?.date}</div>
    </div>
  );
};

const Commits = ({url}) => {
  const [commits, setCommits] = useState([]);
  //    setting this to true initially as a demount/mount should presume a fetch will happen
  const [isFetchingCommits, setIsFetchingCommits] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios(url);
        if (response && response.status === 200) {
          console.log('commits response', response.data);
          setCommits(response.data);
        }
      } catch (err) {
        setError('Looks like something went wrong fetching commits..');
      } finally {
        setIsFetchingCommits(false);
      }
    };
    if (url) {
      fetchCommits();
    }
  }, [url]);

  return (
    <sections.root>
      <h5>Commits</h5>
      {isFetchingCommits && <div>Fetching commits...</div>}
      {error && <div>{error}</div>}
      {commits.map((data) => (
        <Commit key={data.commit.tree.sha} data={data} />
      ))}
    </sections.root>
  );
};

export default Commits;
