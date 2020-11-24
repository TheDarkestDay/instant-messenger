import { appHistory } from '../history';

export const LogoutButton = () => {
  const handleLogOut = () => {
    localStorage.removeItem('instant-messenger:userId');

    appHistory.push('/login');
  };

  return (
    <button onClick={handleLogOut}>
      Log Out
    </button>
  );
};