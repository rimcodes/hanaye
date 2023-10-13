import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  catsApiUrl = `${environment.api}/categories`
  categories: Category[] = []

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.catsApiUrl)
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.catsApiUrl}/${id}`)
  }

  createCategory(catFormData: FormData) {
    return this.http.post(this.catsApiUrl, catFormData)
  }

  updateCategory(catFormData: FormData) {
    return this.http.patch(this.catsApiUrl, catFormData)
  }

  deleteCategory(id: string) {
    return this.http.delete(this.catsApiUrl, { body: { id }})
  }
}
