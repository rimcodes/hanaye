import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  catsApiUrl = `${environment.api}/stores`

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.catsApiUrl)
  }

  getStore(id: string): Observable<Store> {
    return this.http.get<Store>(`${this.catsApiUrl}/${id}`)
  }

  createStore(storeFormData: FormData) {
    return this.http.post(this.catsApiUrl, storeFormData)
  }

  updateStore(storeFormData: FormData) {
    return this.http.patch(this.catsApiUrl, storeFormData)
  }

  deleteStore(id: string) {
    return this.http.delete(this.catsApiUrl, { body: { id }})
  }

}
