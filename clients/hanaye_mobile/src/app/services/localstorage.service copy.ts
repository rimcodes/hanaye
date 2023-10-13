import { Injectable } from '@angular/core';

const TOKEN = 'jwttoken'
const USER = 'user'
const LANG = 'lang'
const SUB = 'subscribed'

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

  subscribe() {
    localStorage.setItem(SUB, '1')
  }

  unSubscribe() {
    localStorage.setItem(SUB, '0')
  }

  getSub() {
    return localStorage.getItem(SUB)
  }


  // Storage language info
  getLang(): 'ar' | 'fr' | 'en' {
    const lang = localStorage.getItem(LANG)
    if(lang === 'ar' || lang === 'fr' || lang === 'en') {
      return lang
    } else {
      return 'ar'
    }
  }

  setLang(data: 'ar' | 'en' | 'fr') {
    localStorage.setItem(LANG, data)
  }
}
