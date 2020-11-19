import axios from 'axios';

export const sendMessage = (chatId, authorId, text) => {
  return axios.post(`/conversations/${chatId}/messages`, {authorId: Number(authorId), text}).then((response) => response.data);
};