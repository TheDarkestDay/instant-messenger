import { useContext, useEffect, useState } from 'react';
import { WebSocketsContext } from './WebSocketsContext';

export const useChatMessages = (chatId) => {
  const [state, setState] = useState({messages: []});
  const { socket } = useContext(WebSocketsContext);

  const { messages } = state;

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