import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from 'src/app/models/store.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store!: Store;
  products$!: Observable<Product[]>

  constructor(
    private storesService: StoresService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.storesService.getStore(params['id']).subscribe({
          next: (res) => {
            this.store = res;
            this.products$ = this.productsService.getAllProducts({stores: params['id']})
          },
          error: (err) => {
            alert(err);
          },
        });
      }
    });
  }


}
