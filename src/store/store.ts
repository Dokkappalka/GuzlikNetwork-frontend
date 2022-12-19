import { AuthResponse } from './../models/response/AuthResponse'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import { IUser } from './../models/IUser'
import axios from 'axios'
import { API_URL } from '../http'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  tariffDate = ' '
  constructor() {
    makeAutoObservable(this)
  }
  setAuth(bool: boolean) {
    this.isAuth = bool
  }
  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }
  setTariffDate(date: any) {
    localStorage.setItem('tariffDate', date.split('T')[1].split('.')[0])
  }

  async login(phone: string, password: string, setStatus: any) {
    this.setLoading(true)
    try {
      const response = await AuthService.login(phone, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error: any) {
      console.log(error.response?.data?.message)
      setStatus(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async registration(phone: string, password: string, setStatus: any) {
    this.setLoading(true)
    try {
      const response = await AuthService.registration(phone, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error: any) {
      setStatus(error.response?.data?.message)
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async logout() {
    this.setLoading(true)
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error: any) {
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async updateBalance(newBalance: number, setStatus?: any) {
    this.setLoading(true)
    try {
      const response = await UserService.updateBalance(newBalance)
      this.setUser(response.data.user)
    } catch (error: any) {
      if (setStatus) {
        setStatus(error.response?.data?.message)
      }

      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async updateTariff(newTariff: string) {
    try {
      const response = await UserService.updateTariff(newTariff)
      //localStorage.setItem('tariff', response.data.user.tariff) Если что-то не получится, то потом проверить
      this.setUser(response.data.user)
      this.setTariffDate(response.data.tariffTime)
    } catch (error: any) {
      console.log(error.response?.data?.message)
    }
  }
  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error: any) {
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async activate(code: string, setStatus: any) {
    this.setLoading(true)
    try {
      const response = await UserService.activate(code)
      this.setUser(response.data.user)
    } catch (error: any) {
      setStatus(error.response?.data?.message)
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}
