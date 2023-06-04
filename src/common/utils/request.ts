import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import baseURL from "common/utils/base-url";

interface IResponse<IPayload, TStatus> {
  status: TStatus;
  message: string;
  payload: IPayload;
}

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
const REQUEST_TIME_LIMIT = 6000

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token: string | null = localStorage.getItem("token") || null;

  let headers = config.headers ?? {};

  if (token) headers.Authorization = `Bearer ${token}`;

  const newConfig: InternalAxiosRequestConfig = {
    ...config,
    headers,
    timeout: REQUEST_TIME_LIMIT
  };

  return newConfig;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    alert("Непредвиденная ошибка!")
    return Promise.reject(error)
  }
);

const request = <IPayload, TStatus>() => ({
  get: instance.get<IResponse<IPayload, TStatus>>,
  post: instance.post<IResponse<IPayload, TStatus>>,
});

export default request;
