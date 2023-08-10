import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavoriteItem, Favorites, Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

const FAV_KEY = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsApiUrl = `${environment.api}/products`
  favs$: BehaviorSubject<Favorites> = new BehaviorSubject(this.getFavorites());
  services: Product[] = []

  constructor(private http: HttpClient) { }


  getAllProducts(filter?: {stores?: string, client?: string}) {
    if (filter?.stores) {
      console.log("Stores with id ...")
      return this.http.get<Product[]>(`${this.productsApiUrl}?stores=${filter?.stores}`)
    } else if(filter?.client) {
      console.log("Client with id ...")
      return this.http.get<Product[]>(`${this.productsApiUrl}?client=${filter?.client}`)
    } else {
      return this.http.get<Product[]>(this.productsApiUrl)
    }
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.productsApiUrl}/${id}`)
  }

  createProduct(productFromData: FormData) {
    return this.http.post(this.productsApiUrl, productFromData)
  }

  updateProduct(productFromData: FormData) {
    return this.http.patch(this.productsApiUrl, productFromData)
  }

  deleteProduct(id: string) {
    return this.http.delete(this.productsApiUrl, {body: {id}})
  }

  getFavorites(): Favorites {
    const favoritesJsonString: string | null = localStorage.getItem(FAV_KEY);
    if (favoritesJsonString) {
      const favs: Favorites = JSON.parse(favoritesJsonString || '');
      return favs;
    }

    const initalFavs: Favorites = {
      items: [],
    };
    return initalFavs;
  }

  setFavItem(favItem: FavoriteItem): Favorites {
    const favs = this.getFavorites();

    const favsItemExist = favs.items.find(
      (item) => item.productId === favItem.productId
    );

    if (!favsItemExist) {
      favs.items.push(favItem);
    }

    const favJson = JSON.stringify(favs);
    localStorage.setItem(FAV_KEY, favJson);
    this.favs$.next(favs);
    return favs;
  }

  removeFavItem(productId: string) {
    let favs = this.getFavorites();

    favs.items = favs.items.filter(
      (item) => item.productId !== productId
    );

    const favJson = JSON.stringify(favs);
    localStorage.setItem(FAV_KEY, favJson);
    this.favs$.next(favs);
    return favs;
  }

  checkIfFav(id: string): boolean {
    let isFav = false
    this.getFavorites().items.forEach(item => {
      if (item.productId === id) {
        isFav = true
        // return
      }
    })

    return isFav
  }
}
