import { WebSocketsProvider } from './WebSocketsProvider';
import { ChatList } from './ChatList';
import { MessagesList } from './MessagesList';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styles from './chat-page.module.css';

export const ChatPage = () => {
  const { path } = useRouteMatch();

  return (
    <section className={styles.chatPage}>
      <h1 className={styles.chatPageTitle}>
        Chat page
      </h1>

      <WebSocketsProvider>
        <div className={styles.flexRow}>
          <ChatList />

          <Switch>
            <Route exact path={path}>
              <p>
                Please, select a chat
              </p>
            </Route>

            <Route path={`${path}/:chatId`}>
              <MessagesList />
            </Route>
          </Switch>
        </div>
      </WebSocketsProvider>
    </section>
  );
};