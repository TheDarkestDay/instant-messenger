import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { ChatPage } from './chat/ChatPage';
import { LoginPage } from './auth/LoginPage';
import { AuthGuard } from './auth/AuthGuard';
import { appHistory } from './history';
import { StoreProvider } from './store/store-provider';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router history={appHistory}>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/chat">
              <AuthGuard>
                <ChatPage />
              </AuthGuard>
            </Route>

            <Route path="*">
              <Redirect to="/chat"/>
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
