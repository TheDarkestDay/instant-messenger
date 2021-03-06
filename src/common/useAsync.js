import { useCallback, useReducer } from 'react';
import { AsyncStatus } from './asyncStatus';

const initialState = {
  status: AsyncStatus.idle,
  data: null,
  error: null,
}

const AsyncActionType = {
  started: 'started',
  completed: 'completed',
  failed: 'failed',
  reset: 'reset',
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case AsyncActionType.started:
      return {
        ...state,
        status: AsyncStatus.loading
      };
    case AsyncActionType.completed:
      return {
        ...state,
        status: AsyncStatus.completed,
        data: action.payload.data,
      };
    case AsyncActionType.failed:
      return {
        ...state,
        status: AsyncStatus.failed,
        data: action.payload.error,
      };
    case AsyncActionType.reset:
      return initialState;
  }
};

export const useAsync = (asyncCallback) => {
  const [state, dispatch] = useReducer(asyncReducer, initialState);
  const { data, status, error } = state;

  const runAsync = () => {
    dispatch({type: AsyncActionType.started});

    asyncCallback()
      .then((data) => {
        dispatch({type: AsyncActionType.completed, payload: {data}});
      })
      .catch((error) => {
        dispatch({type: AsyncActionType.failed, payload: {error}});
      });
  };

  const resetAsync = useCallback(() => {
    dispatch({type: AsyncActionType.reset});
  }, [dispatch]);

  return { data, status, error, runAsync, resetAsync };
};