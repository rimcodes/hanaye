import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

export class Lang {
  name!: 'Français' | 'English' | 'العربية'
  lang!: 'ar' | 'fr' | 'en'
  img!: string
}

@Injectable({
  providedIn: 'root'
})
export class TranslatingService {
  defaultLang: 'ar' | 'fr' | 'en' = 'ar'
  dir!: 'ltr' | 'rtl'
  langs: Lang[] = [
    {
      name: 'Français',
      lang: 'fr',
      img: 'assets/langs/frthumbnail.png'
    },
    {
      name: 'English',
      lang: 'en',
      img: 'assets/langs/enthumbnail.png'
    },
    {
      name: 'العربية',
      lang: 'ar',
      img: 'assets/langs/mrthumbnail.png'
    },
  ]

  constructor(private localstorageService: LocalstorageService) {
    this.defaultLang = localstorageService.getLang()
    if (this.defaultLang === 'ar') {
      this.dir = 'rtl'
    } else {
      this.dir = 'ltr'
    }
  }

  setAppLang(lang: 'ar' | 'fr' | 'en') {
    this.localstorageService.setLang(lang)
  }

}
