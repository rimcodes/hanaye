import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DateAgoPipe } from '../pipes/date-ago.pipe';

// Transtate
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingComponent } from './loading/loading.component';

// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ProductItemComponent,
    DateAgoPipe,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      // missingTranslationHandler: {provide: MissingTranslationHandler, useClass: }
      isolate: true
    }),
  ],
  exports: [
    ProductItemComponent,
    TranslateModule,
    DateAgoPipe,
    LoadingComponent
  ]
})
export class SharedModule { }
