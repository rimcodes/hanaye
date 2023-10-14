import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { TranslatingService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  implements OnInit {
  product!: Product

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public translate: TranslateService,
    public platform: Platform,
    private translatingService: TranslatingService,
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr'])
    // Set default language
    this.translate.setDefaultLang(translatingService.defaultLang);
    document.dir = "rtl";
  }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.productsService.getProduct(params['id'])
          .subscribe({
            next: (res) => {
              this.product = res
            },
            error: (err) => {
              console.log(err)
            }
          })

      }
    })
  }


}
