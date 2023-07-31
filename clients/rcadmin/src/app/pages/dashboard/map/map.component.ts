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

export interface RCDrenderer {
  user: User;
  directionResult$: Observable<google.maps.DirectionsResult | undefined>;
  options?: google.maps.DirectionsRendererOptions;
  position: google.maps.LatLng;
  order: number
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @Input() clientPosition!: google.maps.LatLng; // to delete
  @Input() workers: User[] = [];
  @Input() client!: User;
  // usersPositions: {position: } = [] // To delete
  apiLoaded!: Observable<boolean>;
  clusterApiLoaded!: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: 18.077819265626548, lng: -15.96880064486457 },
    zoom: 12,
  };
  rcdRenders: RCDrenderer[] = [];
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private http: HttpClient,
    private mapDirectionsService: MapDirectionsService
  ) {}

  ngOnInit(): void {
    this.apiLoaded = this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.mapApiKey}`,
        'callback'
      )
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => of(false))
      );
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
    this.showClient();
    this.showWorkers();
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, user?: User) {
    infoWindow.open(marker);
  }

  // const options: google.maps.DirectionsRendererOptions = {
  //   polylineOptions: { strokeColor: '#0fe026' },
  // };
  loadDirections() {}

  showWorkers() {
    if (this.workers) {
      // show workers
      this.workers.forEach((provider, index) => {
        let workerCords = provider.location?.replace('(', '').replace(')', '');
        const workersCordsArray = workerCords?.split(', ');
        if (workersCordsArray) {
          const location = new google.maps.LatLng(
            +workersCordsArray[0],
            +workersCordsArray[1]
          );

          // this.usersPositions.push(location);
          const request: google.maps.DirectionsRequest = {
            origin: this.clientPosition,
            destination: location,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          this.rcdRenders.push({
            user: provider,
            directionResult$: this.mapDirectionsService
              .route(request)
              .pipe(map((response) => {
                response.result
                return response.result
              })),
            position: location,
            options: {
              polylineOptions: { strokeColor: COLORS[index] },
              markerOptions: { visible: false },
            },
            order: index + 1
          });

        }
      });
    } else {
      console.log('No workers yet ...');
    }
  }

  showClient() {
    if (this.client) {
      // Show the client
      const location = this.client.location?.replace('(', '').replace(')', '');
      const cordsArray = location?.split(', ');
      if (cordsArray) {
        this.clientPosition = new google.maps.LatLng(
          +cordsArray[0],
          +cordsArray[1]
        );
      }
    } else {
      console.log('No Clients Yet');
    }
  }

  loadDirection() {}
}
