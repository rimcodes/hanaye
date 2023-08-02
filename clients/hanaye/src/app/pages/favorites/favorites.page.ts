import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Favorites } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { TranslatingService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites!: Favorites

  constructor(
    public translate: TranslateService,
    private translatingService: TranslatingService,
    private productsService: ProductsService,
    private router: Router
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr'])
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
    document.dir = "rtl";
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
  }

  removeFromFav(id: string, slidingItem: IonItemSliding) {
    this.productsService.removeFavItem(id)
    this.favorites = this.productsService.getFavorites()
    slidingItem.close()
  }

  requestService(id: string, slidingItem: IonItemSliding) {
    slidingItem.close()
    this.router.navigate(['tabs', 'home', 'service-details', id])
  }

}
