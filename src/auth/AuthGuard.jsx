import { Redirect } from 'react-router-dom';

export const AuthGuard = ({children}) => {
  const userId = localStorage.getItem('instant-messenger:userId');

  if (!userId) {
    return <Redirect to="/login" />;
  }

  return children;
};