import React, {useReducer} from 'react';

const RepositoryStateContext = React.createContext();
const RepositoryDispatchContext = React.createContext();

const actionTypes = {
  SET_ERROR: 'repository/ERROR',
  SET_FILTER: 'repository/SET_FILTER',
  SET_LOADING: 'repository/LOADING',
  SET_REPOSITORY_PULLS: 'repository/SET_PULLS',
};

export const actions = {
  setError: (payload) => ({
    type: actionTypes.SET_ERROR,
    payload,
  }),
  setFilter: (payload) => ({
    type: actionTypes.SET_FILTER,
    payload,
  }),
  setLoading: (payload) => ({
    type: actionTypes.SET_LOADING,
    payload,
  }),
  setRepositoryPulls: (payload) => ({
    type: actionTypes.SET_REPOSITORY_PULLS,
    payload,
  }),
};

const defaultState = {
  error: undefined,
  isLoading: false,
  pulls: [],
  filter: undefined,
};
const repositoryReducer = (state, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.SET_LOADING: {
      nextState.isLoading = action.payload;
      break;
    }
    case actionTypes.SET_FILTER: {
      nextState.filter = action.payload;
      break;
    }
    case actionTypes.SET_REPOSITORY_PULLS: {
      nextState.pulls = action.payload;
      break;
    }
    case actionTypes.SET_ERROR: {
      nextState.error = action.payload;
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
