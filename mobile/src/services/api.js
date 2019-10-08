import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.1.74:3333',
  baseURL: 'https://e0yb8.sse.codesandbox.io', 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});

export default api;
