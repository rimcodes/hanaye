import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsApiUrl = `${environment.api}/products`

  constructor(private http: HttpClient) { }


  getAllProducts() {
    return this.http.get<Product[]>(this.productsApiUrl)
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.productsApiUrl}/${id}`)
  }

  createProduct(productFromData: FormData) {
    return this.http.post(this.productsApiUrl, productFromData)
  }

  updateProduct(productFromData: FormData) {
    return this.http.put(this.productsApiUrl, productFromData)
  }

  deleteProduct(id: string) {
    return this.http.delete(this.productsApiUrl, {body: {id}})
  }
}
