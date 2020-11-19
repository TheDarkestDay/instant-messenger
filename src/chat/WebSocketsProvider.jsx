import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { WebSocketsContext } from './WebSocketsContext';

export const WebSocketsProvider = ({children}) => {
  const [state, setState] = useState({
    socket: null,
  });
  const { socket } = state;

  useEffect(() => {
    const newSocket = io();

    setState((prevState) => {
      return {
        ...prevState,
        socket: newSocket,
      }
    });

    return () => {
      newSocket.disconnect();
    }
  }, []);

  const contextValue = {
    socket,
  }

  return (
    <WebSocketsContext.Provider value={contextValue}>
      {children}
    </WebSocketsContext.Provider>
  );
};