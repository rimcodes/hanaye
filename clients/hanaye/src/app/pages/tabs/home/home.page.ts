import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { FavoriteItem, Favorites, Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ProductsService } from 'src/app/services/products.service';
import { TranslatingService } from 'src/app/services/translate.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products!: Product[];
  users$!: Observable<User[]>;
  user!: User;
  userId!: string;
  favs!: Favorites;

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private storageService: LocalstorageService,
    public translate: TranslateService,
    private translatingService: TranslatingService
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr']);
    // Set default language
    this.translate.setDefaultLang(translatingService.defaultLang);
    document.dir = 'rtl';
  }

  ngOnInit() {
    this.userId = this.storageService.getUser() ?? '';

    if (this.userId !== '') {
      this.usersService.getUser(this.userId).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    this.loadProducts()
    this.users$ = this.usersService.getWorkers();
    this.favs = this.productsService.getFavorites();
  }

  ionViewDidEnter() {
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res
        this.isFav()
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  isFav() {
    const items: Product[] = []
    this.products.forEach((v) => {
      const fav = this.favs.items.find(e => e.productId === v.id)
      if (fav) {
        v.isfavorite = true
        items.push(v)
        console.log("fav found ... ", v)
        return;
      }
      v.isfavorite = false
    });
  }

  addToFav(product: Product) {
    const item: FavoriteItem = { productId: product.id ?? '', product };
    this.productsService.setFavItem(item);
    product.isfavorite = true
  }
}
