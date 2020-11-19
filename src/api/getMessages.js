import axios from 'axios';

export const getMessages = (chatId) => {
  return axios.get(`/conversations/${chatId}/messages`).then((response) => response.data);
};