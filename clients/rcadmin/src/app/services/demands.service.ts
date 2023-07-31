import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Demand } from '../models/demand.model';

@Injectable({
  providedIn: 'root'
})
export class DemandsService {
  demandsApi = `${environment.api}/demands`
  cachedDemands!: Observable<Demand[]>
  demands: Demand[] = []

  constructor(private http: HttpClient) { }

  getAllDemands() {
    return this.http.get<Demand[]>(this.demandsApi)
  }

  getDemand(id: string) {
    return this.http.get<Demand>(`${this.demandsApi}/${id}`)
  }

  createDemand(demandFormData: FormData) {
    return this.http.post(this.demandsApi, demandFormData)
  }

  updateDemand(demandFormData: FormData) {
    return this.http.patch(this.demandsApi, demandFormData)
  }

  deleteDemand(id: string) {
    return this.http.delete(this.demandsApi, {body: {id}})
  }

}
