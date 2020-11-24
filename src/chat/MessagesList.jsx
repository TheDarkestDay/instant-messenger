
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../api';
import { AsyncStatus, useAsync } from '../common';
import { useChatMessages } from './useChatMessages';
import { useCurrentMessage } from './use-current-message';
import styles from './messages-list.module.css';

export const MessagesList = () => {
  const userId = Number(localStorage.getItem('instant-messenger:userId'));
  const { chatId } = useParams();
  const { messages } = useChatMessages(chatId);
  const {message, setMessage, clearDraft} = useCurrentMessage(chatId);

  const {status, error, runAsync, resetAsync} = useAsync(() => sendMessage(chatId, userId, message));

  useEffect(() => {
    if (status === AsyncStatus.completed) {
      clearDraft();

      resetAsync();
    }
  }, [clearDraft, status]);

  const handleSubmit = (event) => {
    event.preventDefault();

    runAsync();
  };

  const handleMessageUpdate = (event) => {
    setMessage(event.target.value);
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