import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChats } from '../api';
import { AsyncStatus, useAsync } from '../common';

export const ChatList = () => {
  const userId = localStorage.getItem('instant-messenger:userId');
  const { data: users = [], status, error, runAsync } = useAsync(() => getChats(userId));

  useEffect(() => {
    runAsync();
  }, []);

  if (status === AsyncStatus.loading || status === AsyncStatus.idle) {
    return <p> Loading... </p>
  }

  return (
    <nav>
      {
        users.map((chat) => {
          return (
            <Link key={chat.id} to={`/chat/${chat.id}`}>
              {chat.user.name}
            </Link>
          );
        })
      }
    </nav>
  );
};