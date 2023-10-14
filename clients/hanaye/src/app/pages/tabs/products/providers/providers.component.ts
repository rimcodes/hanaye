import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  client!: any;
  products$!: Observable<Product[]>;
  store!: Store
  noProducts = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private storesService: StoresService,
  ) {
    this.client = { ...this.router.getCurrentNavigation()!.extras.state };
  }

  ngOnInit() {
    this.storesService.getWorkerStore(this.client.id).subscribe({
      next: (res) => {
        this.store = res
      },
      error: (err) => {
        this.noProducts = true
        console.log(err)
      }
    })

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.products$ = this.productsService.getAllProducts({
          client: params['id'],
        });
      }
    });
  }
}
