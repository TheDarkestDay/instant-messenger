import React, { useState } from 'react';
import { StoreContext } from './store-context';

const initialState = {
  username: null
};

export const StoreProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  const contextValue = {
    getUsername() {
      return state.username;
    },
    setUsername(username) {
      setState((oldState) => ({...oldState, username}));
    }
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};