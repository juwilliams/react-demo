import {render, expect, screen, rest, setupServer} from '@testing-library/react';

import {RepositoryProvider} from 'state/repository.state';
import Repository from 'components/repository/repository.component';

test('renders repository', async () => {
  render(
    <RepositoryProvider>
      <Repository />
    </RepositoryProvider>,
  );
  expect(await screen.findAllByTestId('repository')).toBeInDocument();
});
