import {render} from '@testing-library/react';

import {RepositoryProvider} from 'state/repository.state';
import Pull from 'components/pull/pull.component';

test('renders pull title/body/commits section', async () => {
  const mockPull = {
    title: 'mock-pull-title',
    body: 'mock-pull-body',
  };

  const {queryByTestId} = render(
    <RepositoryProvider>
      <Pull pull={mockPull} />
    </RepositoryProvider>,
  );

  expect(queryByTestId('pull-title')).toBeTruthy();
  expect(queryByTestId('pull-body')).toBeTruthy();
  expect(queryByTestId('pull-commits')).toBeTruthy();
});

test('renders commits', async () => {
  const mockPull = {
    title: 'mock-pull-title',
    body: 'mock-pull-body',
  };

  const mockCommits = [
    {
      commit: {
        committer: {
          date: '2020-01-01 00:00:01',
        },
        message: 'mock commit message',
        tree: {
          sha: 'mock-commit-sha',
        },
      },
      author: {
        login: 'mock-commit-author-login',
      },
    },
  ];

  const {queryByTestId} = render(
    <RepositoryProvider>
      <Pull pull={mockPull} commits={mockCommits} />
    </RepositoryProvider>,
  );

  //  test existence of elements
  expect(queryByTestId('commit')).toBeTruthy();
  expect(queryByTestId('commit-message')).toBeTruthy();
  expect(queryByTestId('commit-author')).toBeTruthy();
  expect(queryByTestId('commit-date')).toBeTruthy();
});
