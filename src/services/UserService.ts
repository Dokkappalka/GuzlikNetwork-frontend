import { AuthResponse } from './../models/response/AuthResponse'
import $api from '../http'
import { AxiosResponse } from 'axios'

export default class UserService {
  static async updateBalance(
    newBalance: number
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/updateBalance', { newBalance })
  }
  static async updateTariff(
    newTariff: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/updateTariff', { newTariff })
  }
  static async activate(code: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.get(`/activate/${code}`)
  }
}
