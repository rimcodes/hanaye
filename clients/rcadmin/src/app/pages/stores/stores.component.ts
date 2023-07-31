import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  stores$!: Observable<Store[]>

  constructor(private storesService: StoresService) {}

  ngOnInit(): void {
      this.loadStores()
  }

  loadStores() {
    this.stores$ = this.storesService.getAllStores()
  }
}
