import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient,
    private localstorageService: LocalstorageService) { }

  subscribe(subscription: any) {
    return this.http
      .post(environment.baseUrl + 'notifs/subscribe/' + this.localstorageService.getUser(), subscription)
      .pipe(map((res) => res));
  }

  triggerMessage(message: string, id: string) {
    return this.http
      .post(environment.baseUrl + 'notifs/' + id , JSON.parse(message))
      .pipe(map((res) => res));
  }

  triggerMsgToWorker() {

  }

  triggerMsgUser(message: string, id: string) {
    return this.http
      .post(environment.baseUrl + 'message', { payload: JSON.parse(message), id: id})
      .pipe(map((res) => res))
  }

  unSubscibe(sub: any) {
    return this.http.post(environment.baseUrl = 'unsubscribe', sub)
            .pipe((res) => res)
  }

}
