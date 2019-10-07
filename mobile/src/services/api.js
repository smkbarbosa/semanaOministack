import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'https://e0yb8.sse.codesandbox.io', 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});

export default api;
