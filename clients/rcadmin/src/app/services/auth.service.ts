import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authAPI = `${environment.api}/auth`
  userId!: string

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
}
