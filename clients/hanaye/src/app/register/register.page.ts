import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { Lang, TranslatingService } from '../services/translate.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  langs: Lang[] = this.translatingService.langs;
  nameIsTaken!: boolean;

  constructor(
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    public platform: Platform,
    public translate: TranslateService,
    private translatingService: TranslatingService
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr']);
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
    // document.dir = "rtl";
  }

  ngOnInit() {
    this._initForm();
  }

  onSubmit() {
    const registerFromData = new FormData();

    Object.keys(this.registerForm).map((key) => {
      registerFromData.append(key, this.registerForm[key].value);
    });

    this.authService.register(registerFromData).subscribe({
      next: (res) => {
        this.localstorageService.setToken(res.token);
        this.localstorageService.setUser(res.user.id);

        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status == 409) {
          this.nameIsTaken = true
        }

      }
    });
  }

  ionViewDidEnter() {
    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
  }

  //Switch language
  translateLanguageTo(lang: 'ar' | 'fr' | 'en') {
    this.translatingService.defaultLang = lang;
    this.translate.use(lang);
    if (lang === 'fr' || lang === 'en') {
      document.dir = 'ltr';
    }
    if (lang === 'ar') {
      document.dir = 'rtl';
    }

    this.translatingService.setAppLang(lang);

    this.router.navigate(['login']);
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: [''],
      phone: [null, Validators.required],
      password: [
        null,
        Validators.required,
      ],
      // phone: ['', !this.platform.is('ios') ?? Validators.required ],
      email: [''],
      address: [''],
    });
  }

  get registerForm() {
    return this.form.controls;
  }
}
