import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../api';
import { AsyncStatus, useAsync } from '../common';

export const LoginPage = () => {
  const [state, setState] = useState({
    userName: ''
  });
  const { userName } = state;
  const { data: createdUser, status, error, runAsync } = useAsync(() => createUser(userName));

  const handleUserNameChange = (event) => {
    const newName = event.target.value;

    setState((prevState) => {
      return {
        ...prevState,
        userName: newName,
      } 
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    runAsync();
  };

  if (status === AsyncStatus.completed) {
    localStorage.setItem('instant-messenger:userId', createdUser.id);

    return <Redirect to="/chat" />;
  }

  return (
    <section>
      <h1>
        Sign in
      </h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">
          Your name:
        </label>

        <input id="username" type="text" value={userName} onChange={handleUserNameChange} />

        <button type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
};