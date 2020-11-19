import axios from 'axios';

export const getChats = (userId) => {
  return axios.get('/conversations', {params: {userId}}).then((response) => response.data);
};