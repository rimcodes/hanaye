import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  servicesApiUrl = `${environment.api}/services`
  services: Service[] = []

  constructor(private http: HttpClient) { }

  getAllServices() {
    return this.http.get<Service[]>(this.servicesApiUrl)
  }

  getService(id: string) {
    return this.http.get<Service>(`${this.servicesApiUrl}/${id}`)
  }

  createService(serviceFromData: FormData) {
    return this.http.post(this.servicesApiUrl, serviceFromData)
  }

  updateService(serviceFromData: FormData) {
    return this.http.patch(this.servicesApiUrl, serviceFromData)
  }

  deleteService(id: string) {
    return this.http.delete(this.servicesApiUrl, {body: {id}})
  }
}
