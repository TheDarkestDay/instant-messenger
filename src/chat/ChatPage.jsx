import { WebSocketsProvider } from './WebSocketsProvider';
import { ChatList } from './ChatList';
import { MessagesList } from './MessagesList';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export const ChatPage = () => {
  const { path } = useRouteMatch();

  return (
    <section>
      <h1>
        Chat page
      </h1>

      <WebSocketsProvider>
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
      </WebSocketsProvider>
    </section>
  );
};