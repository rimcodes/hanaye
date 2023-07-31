import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
// register Swiper custom elements
register();

@Component({
  standalone: true,
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularProductsComponent  implements OnInit {
  products$!: Observable<Product[]>

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getAllProducts()
  }

}
