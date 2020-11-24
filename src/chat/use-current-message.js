import { useState, useCallback } from 'react';

export const useCurrentMessage = (chatId) => {
  const [state, setState] = useState({});

  const setMessage = (newMessage) => {
    setState((oldState) => ({...oldState, [chatId]: newMessage}));
  };

  const clearDraft = useCallback(() => {
    setState((oldState) => ({
     ...oldState,
     [chatId]: '' 
    }));
  }, [setState, chatId]);

  return {
    message: state[chatId] || '',
    setMessage,
    clearDraft,
  };
};