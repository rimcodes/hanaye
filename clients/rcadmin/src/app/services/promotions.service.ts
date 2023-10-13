import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Promotion } from '../models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  promotionsApiUrl = `${environment.api}/promotions`
  promotions: Promotion[] = []

  constructor(private http: HttpClient) { }

  getAllPromotions() {
    return this.http.get<Promotion[]>(this.promotionsApiUrl)
  }

  getPromotion(id: string) {
    return this.http.get<Promotion>(`${this.promotionsApiUrl}/${id}`)
  }

  createPromotion(promotionFormData: FormData) {
    return this.http.post(this.promotionsApiUrl, promotionFormData)
  }

  updatePromotion(promotionFormData: FormData) {
    return this.http.put(this.promotionsApiUrl, promotionFormData)
  }

  deletePromotion(id: string) {
    return this.http.delete(this.promotionsApiUrl, {body: {id}})
  }
}
