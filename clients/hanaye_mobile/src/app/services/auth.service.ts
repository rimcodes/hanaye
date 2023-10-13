import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authAPI = `${environment.api}/auth`

  constructor(
    private http: HttpClient,
    private storageService: LocalstorageService,
    private router: Router
  ) { }

  login(loginFormData: FormData): Observable<any> {
    return this.http.post<any>(`${this.authAPI}`, loginFormData)
  }

  register(registerFromData: FormData) {
    return this.http.post<{ user: User, token: string}>(`${this.authAPI}/register`, registerFromData)
  }

  updateProfile(updateFormData: FormData) {
    return this.http.put<User>(`${this.authAPI}/update`, updateFormData)
  }

  uploadImage(imageFormData: FormData, id: string) {
    return this.http.put<User>(`${this.authAPI}/update-image/${id}`, imageFormData)
  }

  logout() {
    // clear cookie
    this.storageService.removeUser()
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.storageService.getToken();
      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if (!this._tokenExpired(tokenDecode.exp)) {
          return true;
        }
        return true
      }
      this.router.navigate(['/login']);
      return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  // Delete user account initiating form the user
  inintDeleteUser(msg: string, id: string) {
    return this.http.post(this.authAPI + '/delete', {message: msg, id})
  }
}
