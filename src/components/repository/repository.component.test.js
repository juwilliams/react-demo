import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

import {RepositoryProvider} from 'state/repository.state';
import Repository from 'components/repository/repository.component';

test('renders repository', async () => {
  const {queryByTestId} = render(
    <RepositoryProvider>
      <Repository />
    </RepositoryProvider>,
  );

  expect(queryByTestId('repository')).toBeTruthy();
});

test('renders repository with pulls and pull links', async () => {
  const mockPulls = [
    {
      id: 'mock-pull-1',
      title: 'mock-pull-1-title',
      createdAt: 'mock-pull-1-created-at',
    },
  ];
  const {queryByTestId} = render(
    <Router>
      <RepositoryProvider>
        <Repository pulls={mockPulls} />
      </RepositoryProvider>
    </Router>,
  );

  expect(queryByTestId('mock-pull-1')).toBeTruthy();
  expect(queryByTestId('link-mock-pull-1')).toBeTruthy();
});
