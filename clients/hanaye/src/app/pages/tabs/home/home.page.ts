import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
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
  products$!: Observable<Product[]>;
  user!: User
  userId!: string

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private storageService: LocalstorageService,
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
    this.userId = this.storageService.getUser() ?? ''

    if (this.userId !== '') {
      this.usersService.getUser(this.userId)
        .subscribe({
          next: (res) => {
            this.user = res
          },
          error: (err) => {
            console.log(err)
          }
        })
    }
    this.products$ = this.productsService.getAllProducts();
  }

  ionViewDidEnter() {
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
  }
}
