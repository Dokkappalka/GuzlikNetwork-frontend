import { AuthResponse } from './../models/response/AuthResponse'
import $api from '../http'
import { AxiosResponse } from 'axios'

export default class AuthService {
  static async login(
    phone: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { phone, password })
  }
  static async registration(
    phone: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { phone, password })
  }
  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
