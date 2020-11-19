import { useContext, useEffect, useState } from 'react';
import { getMessages } from '../api';
import { AsyncStatus, useAsync } from '../common';
import { WebSocketsContext } from './WebSocketsContext';

export const useChatMessages = (chatId) => {
  const [state, setState] = useState({messages: []});
  const { socket } = useContext(WebSocketsContext);
  const {data: initialMessages, status, runAsync} = useAsync(() => getMessages(chatId));

  const { messages } = state;

  useEffect(() => {
    runAsync();
  }, [chatId]);

  useEffect(() => {
    if (status === AsyncStatus.completed) {
      setState((oldState) => ({...oldState, messages: initialMessages}));
    }
  }, [setState, status, initialMessages]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit('JOIN_CHAT', {chatId});

    const newMessageListener = (newMessage) => {
      setState((oldState) => {
        return {
          ...oldState,
          messages: oldState.messages.concat(newMessage),
        }
      });
    };

    socket.on('NEW_MESSAGE', newMessageListener);

    return () => {
      socket.emit('LEAVE_CHAT', {chatId});
      socket.off('NEW_MESSAGE', newMessageListener);
    }
  }, [chatId, setState, socket]);

  return {messages};
};