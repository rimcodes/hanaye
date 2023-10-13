import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { TranslatingService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    public translate: TranslateService,
    private translatingService: TranslatingService
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr'])
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
    document.dir = "rtl";
  }

  ngOnInit() {
    this.products$ = this.productsService.getAllProducts();
  }

  ionViewWillEnter() {
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
  }
}
