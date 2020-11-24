import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getChats } from '../api';
import { AsyncStatus, useAsync } from '../common';
import styles from './chat-list.module.css';

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
    <nav className={styles.chatList}>
      {
        users.map((chat) => {
          return (
            <NavLink className={styles.chatLink} key={chat.id} to={`/chat/${chat.id}`} activeClassName={styles.chatLinkActive}>
              {chat.user.name}
            </NavLink>
          );
        })
      }
    </nav>
  );
};