import Axios from 'axios';

export const urlSocket = 'ws://192.168.137.113:4001';
export const urlMain = 'http://192.168.137.113:4000';

export default Axios.create({
  headers: {
    'Content-Type': 'application/json',
    // Authorization: token,
  },
  baseURL: urlMain + '/api',
});
