import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stores!: Store[]
  apiLoaded!: Observable<boolean>

  constructor(
    private storesService: StoresService,
    private googleMapsApiService: GoogleMapsApiService
  ) {}

  ngOnInit(): void {
    // this.apiLoaded = this.googleMapsApiService.load()
    this.loadStores()
  }

  loadStores() {
    this.storesService.getAllStores().subscribe({
      next: (res) => {
        this.stores = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
