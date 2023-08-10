import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MapDirectionsService,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { COLORS } from 'src/app/services/map-polylines.service';
import { Store } from 'src/app/models/store.model';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api.service';

export interface RCDrenderer {
  user: User;
  directionResult$: Observable<google.maps.DirectionsResult | undefined>;
  options?: google.maps.DirectionsRendererOptions;
  position: google.maps.LatLng;
  order: number;
}

export interface LoadedStore {
  store: Store;
  location: google.maps.LatLng;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  apiLoaded!: boolean;
  clusterApiLoaded!: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: 18.077819265626548, lng: -15.96880064486457 },
    zoom: 12,
  };
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  // Specific for Hanaye
  @Input() stores!: Store[];
  showedStores: LoadedStore[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.mapApiKey}`,
        'callback'
      )
      .subscribe({
        next: (ans) => {
          this.apiLoaded = true;
          this.showStores();
        },
        error: (err) => {
          this.apiLoaded = false;
        },
      });
    // .pipe(
    //   map(() => {
    //     return true;
    //   }),
    //   catchError(() => of(false))
    // );
    this.clusterApiLoaded = this.http
      .jsonp(
        'https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(true))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.showClient();
    // this.showWorkers();
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, user?: User) {
    infoWindow.open(marker);
  }

  // const options: google.maps.DirectionsRendererOptions = {
  //   polylineOptions: { strokeColor: '#0fe026' },
  // };
  loadDirections() {}

  showStores() {
    this.stores?.forEach((store, index) => {
      let storeCords = store.location?.replace('(', '').replace(')', '');
      const cordsArray = storeCords?.split(', ');
      if (cordsArray) {
        const location = new google.maps.LatLng(+cordsArray[0], +cordsArray[1]);

        this.showedStores.push({
          store: store,
          location: location,
        });
      }
    });
  }

}
