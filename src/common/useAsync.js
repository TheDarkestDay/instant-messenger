import { useReducer } from 'react';
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

  return { data, status, error, runAsync };
};