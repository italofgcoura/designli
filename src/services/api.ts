import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {'X-Finnhub-Token': 'ctc6cu9r01qjor97s680ctc6cu9r01qjor97s68g'},
});

export default api;
