import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, share, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsApiService {
  _loaded!: boolean;
  observable!: Observable<boolean> | undefined;

  constructor(private http: HttpClient) {}

  load(): Observable<boolean> {
    // if the api has already been loaded, return true to indicate it has been completed
    if (this._loaded) return of(this._loaded);

    // if a request to load (observable) is NOT currently outstanding, create the request (observable)
    if (!this.observable) {
      // append: your api key to this url here: ?key=XXXXX
      this.observable = this.http
        .jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.mapApiKey}`, 'callback')
        .pipe(
          map(() => true),
          share(),
          tap(() => {
            this._loaded = true;
            // clear the outstanding request
            this.observable = undefined;
          }),
          catchError((err) => {
            console.error(err);
            return of(false);
          })
        );
    }

    // return the observable
    return this.observable;
  }
}
