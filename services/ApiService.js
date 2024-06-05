// services/ApiService.ts
import axios from 'axios';
import { getToken } from '../services/sessionProvider'; // adjust the import path as necessary

const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const AxiosService = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosService.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { AxiosService };

// import axios from "axios";

// const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL

// const AxiosService = axios.create({
//     baseURL : url,
//     headers : {
//         'Content-Type' : 'application/json'
//     }
// });

// AxiosService.interceptors.request.use(
//     config => {
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// AxiosService.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// export { AxiosService };