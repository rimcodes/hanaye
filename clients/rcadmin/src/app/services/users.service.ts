import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersApiUrl = `${environment.api}/users`;
  users: User[] = []


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl)
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.usersApiUrl}/${id}`)
  }

  // Getting the workers
  getWorkers() {
    return this.http.get<User[]>(`${this.usersApiUrl}/workers`)
  }
  // Getting the workers
  getClients() {
    return this.http.get<User[]>(`${this.usersApiUrl}/clients`)
  }
  // Getting the workers
  getAdmins() {
    return this.http.get<User[]>(`${this.usersApiUrl}/admins`)
  }

  createUser(userFormData: FormData) {
    // let object: any = {}
    // userFormData.forEach((value, key) => object[key] = value)

    return this.http.post(this.usersApiUrl, userFormData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(userFormData: FormData) {
    return this.http.put(this.usersApiUrl, userFormData)
  }

  deleteUser(id: string) {
    return this.http.delete(this.usersApiUrl, { body: {id}})
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
