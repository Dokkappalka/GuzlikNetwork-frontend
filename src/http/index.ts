import axios from 'axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:3001/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  if (!config) {
    config = {}
  }
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (error) {
        console.log(error)
      }
    }
    throw error
  }
)

export default $api
