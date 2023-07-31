import { Injectable } from '@angular/core';

const TOKEN = 'jwttoken'
const USER = 'user'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: string) {
    localStorage.setItem(TOKEN, data)
  }

  setUser(data: string) {
    localStorage.setItem(USER, data)
  }

  getToken() {
    return localStorage.getItem(TOKEN)
  }

  getUser() {
    return localStorage.getItem(USER)
  }

  removeUser() {
    localStorage.removeItem(USER);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
