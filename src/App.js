import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { ChatPage } from './chat/ChatPage';
import { LoginPage } from './auth/LoginPage';
import { AuthGuard } from './auth/AuthGuard';
import { appHistory } from './history';

function App() {
  return (
    <div className="App">
      <Router history={appHistory}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/">
            <AuthGuard>
              <ChatPage />
            </AuthGuard>
          </Route>

          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
