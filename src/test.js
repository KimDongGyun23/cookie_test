import axios from "axios";
import { reissue } from "./query";

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER;

export class HttpClient {
  constructor(config) {
    this.client = axios.create(config);
    this.accessToken = null;

    this.onRequest = this.onRequest.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onError = this.onError.bind(this);

    this.client.interceptors.request.use(this.onRequest, this.onError);
    this.client.interceptors.response.use(this.onResponse, this.onError);
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  get(...args) {
    return this.client.get(...args);
  }

  post(...args) {
    return this.client.post(...args);
  }

  onRequest(config) {
    if (this.accessToken) {
      config.headers.Authorization = this.accessToken;
    }
    return config;
  }

  onResponse(response) {
    return response.data;
  }

  async onError(error) {
    const response = error.response;
    const originalRequest = error.config;

    if (axios.isAxiosError(error)) {
      if (response?.status === 403) {
        try {
          const res = await reissue();
          console.log(res);

          if (res.status === 200) {
            const retry = await this.client.request(originalRequest);
            return retry;
          }
        } catch {
          console.error("재발급 실패");
        }
      }
    }

    const errorMsg =
      `Error from : ${error.config.url}\n` +
      `status : ${error.response.status} \n` +
      `message: ${error.response.statusText}`;

    return Promise.reject(errorMsg);
  }
}

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
