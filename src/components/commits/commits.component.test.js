import {render} from '@testing-library/react';

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
