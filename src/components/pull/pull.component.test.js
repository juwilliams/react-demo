import {render} from '@testing-library/react';

import {RepositoryProvider} from 'state/repository.state';
import Pull from 'components/pull/pull.component';

test('renders pull title/body/commits section', async () => {
  const mockPull = {
    title: 'mock-pull-title',
    body: 'mock-pull-body',
    commits_url: 'mock-pull-commits-url',
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
