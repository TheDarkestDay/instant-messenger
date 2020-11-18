import { useEffect } from 'react';
import io from 'socket.io-client';

export const useWebSockets = () => {
  useEffect(() => {
    const socket = io();

    return () => {
      socket.disconnect();
    }
  });
};