import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatingService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  defaultLang!: 'ar' | 'fr' | 'en'
  appVersion = '0.0.4'
  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private translatingService: TranslatingService,
  ) {
    // Register translation languages
    translate.addLangs(['ar', 'fr', 'en'])
    // Set default language
    translate.setDefaultLang(this.translatingService.defaultLang);
    document.dir = this.translatingService.dir;
    this.defaultLang = this.translatingService.defaultLang
    console.log('version: 0.0.4')
  }

  onLogout() {
    this.authService.logout()
  }
}
