import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {
  @Input() location!: string;
  cordsArray?: string[];
  @Output() newCordsEvent = new EventEmitter<string>();

  markerPosition!: google.maps.LatLng;

  apiLoaded!: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: 18.077819265626548, lng: -15.96880064486457 },
    zoom: 15,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.apiLoaded = this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.mapApiKey}`,
        'callback'
      )
      .pipe(
        map((res) => {
          console.log(res);

          this.location = this.location.replace('(', '').replace(')', '')

          this.cordsArray = this.location.split(', ');

          if (this.cordsArray) {
            this.markerPosition = new google.maps.LatLng(
              +this.cordsArray[0],
              +this.cordsArray[1]
            );
          }
          return true;
        }),
        catchError(() => {
          console.log("Something in location picker did not load");

          return of(false);
        })
      );
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng;
    }
    console.log(event.latLng?.toString());
    this.newCordsEvent.emit(event.latLng?.toString());
  }
}
