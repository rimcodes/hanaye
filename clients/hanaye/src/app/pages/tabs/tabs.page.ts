import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatingService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    public translate: TranslateService,
    private translatingService: TranslatingService,
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

}
