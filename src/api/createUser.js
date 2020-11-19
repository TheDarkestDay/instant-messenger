import axios from 'axios';

export const createUser = (userName) => {
  return axios.post('/users', {userName}).then((response) => response.data);
};