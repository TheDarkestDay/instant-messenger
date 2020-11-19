
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../api';
import { AsyncStatus, useAsync } from '../common';
import { useChatMessages } from './useChatMessages';
import styles from './messages-list.module.css';

export const MessagesList = () => {
  const userId = Number(localStorage.getItem('instant-messenger:userId'));
  const { chatId } = useParams();
  const { messages } = useChatMessages(chatId);
  const [state, setState] = useState({
    message: ''
  });

  const { message } = state;
  const {status, error, runAsync} = useAsync(() => sendMessage(chatId, userId, message));

  useEffect(() => {
    if (status === AsyncStatus.completed) {
      setState((oldState) => ({...oldState, message: ''}));
    }
  }, [setState, status]);

  const handleSubmit = (event) => {
    event.preventDefault();

    runAsync();
  };

  const handleMessageUpdate = (event) => {
    setState((oldState) => {
      return {
        ...oldState,
        message: event.target.value,
      }
    });
  };

  return (
    <section className={styles.messagesList}>
      {
        messages.map((message) => {
          return (
            <article key={message.id} className={`${styles.message} ${message.author.id !== userId && styles.notOwnMessage}`}>
              <header className={styles.messageHeader}>
                {message.author.name}
              </header>

              <p className={styles.messageBody}>
                {message.text}
              </p>
            </article>
          );
        })
      }

      <form className={styles.messageForm} onSubmit={handleSubmit}>
        <textarea className={styles.messageField} onChange={handleMessageUpdate} value={message}>
          Type your message...
        </textarea>

        <button className={styles.sendMessageButton} type="submit">
          Send message
        </button>
      </form>
    </section>
  );
};