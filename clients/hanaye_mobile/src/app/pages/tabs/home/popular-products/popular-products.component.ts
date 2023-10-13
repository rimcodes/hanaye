import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { TranslatingService } from 'src/app/services/translate.service';
// register Swiper custom elements
register();

@Component({
  standalone: true,
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    public translate: TranslateService,
    private translatingService: TranslatingService
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr'])
    // Set default language
    this.translate.setDefaultLang(translatingService.defaultLang);
    document.dir = "rtl";
  }

  ngOnInit() {
    this.products$ = this.productsService.getAllProducts();
  }
}
