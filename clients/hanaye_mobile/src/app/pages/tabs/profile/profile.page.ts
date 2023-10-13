import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Lang, TranslatingService } from 'src/app/services/translate.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user!: User
  userd!: string
  langs: Lang[] = this.translatingService.langs
  defaultLang!: 'ar' | 'fr' | 'en'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private storageService: LocalstorageService,
    public translate: TranslateService,
    private translatingService: TranslatingService,
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr'])
    // Set default language
    this.translate.setDefaultLang(translatingService.defaultLang);
    document.dir = "rtl";
   }

  ngOnInit() {
    console.log(this.storageService.getUser())
    this.userd = this.storageService.getUser() ?? ''
    if(this.userd !== '') {
      console.log(this.userd);

      this.usersService.getUser(this.userd).subscribe({
        next: (res) => {
          this.user = res
        },
        error: (err) => [
          console.log(err)
        ]
      })
    }
  }

  //Switch language
  translateLanguageTo(lang: 'ar' | 'fr' | 'en') {
    console.log("Translating ....")
    this.translatingService.defaultLang = lang
    this.translate.use(lang);
    if(lang === "fr" || lang === "en") {
      document.dir = "ltr";
    }
    if(lang === "ar") {
      document.dir = "rtl";
    }

    this.translatingService.setAppLang(lang)

    this.router.navigate(['load'])
  }

}
