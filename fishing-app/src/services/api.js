import axios from 'axios';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para requisições
api.interceptors.request.use(
  config => {
    // Adiciona token de autenticação se necessário
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Adiciona timestamp para prevenir cache em produção
    if (env.production) {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para respostas
api.interceptors.response.use(
  response => response,
  error => {
    // Tratamento centralizado de erros
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Tratar erro de autenticação
          break;
        case 403:
          // Tratar erro de autorização
          break;
        case 429:
          // Tratar limite de requisições
          break;
        default:
          // Outros erros
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api; 