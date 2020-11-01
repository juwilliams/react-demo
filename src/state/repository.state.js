import React, {useReducer} from 'react';

const RepositoryStateContext = React.createContext();
const RepositoryDispatchContext = React.createContext();

const actionTypes = {
  SET_REPOSITORY_PULLS: 'repository/SET_PULLS',
};

export const actions = {
  setRepositoryPulls: (payload) => ({
    type: actionTypes.SET_REPOSITORY_PULLS,
    payload,
  }),
};

const defaultState = {
  pulls: [],
};
const repositoryReducer = (state, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_REPOSITORY_PULLS: {
      nextState.pulls = action.payload;

      break;
    }
    default:
      return state;
  }

  return nextState;
};

export const RepositoryProvider = ({children}) => {
  const [state, dispatch] = useReducer(repositoryReducer, defaultState);

  return (
    <RepositoryStateContext.Provider value={state}>
      <RepositoryDispatchContext.Provider value={dispatch}>
        {children}
      </RepositoryDispatchContext.Provider>
    </RepositoryStateContext.Provider>
  );
};

export const useRepositoryState = () => {
  const context = React.useContext(RepositoryStateContext);
  if (!context) {
    throw new Error('useRepositoryState is only available when used within a RepositoryProvider');
  }
  return context;
};

export const useRepositoryDispatch = () => {
  const context = React.useContext(RepositoryDispatchContext);
  if (!context) {
    throw new Error(
      'useRepositoryDispatch is only available when used within a RepositoryProvider',
    );
  }
  return context;
};

export const useRepository = () => [useRepositoryState(), useRepositoryDispatch()];
