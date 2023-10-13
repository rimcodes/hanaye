import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { TranslatingService } from '../services/translate.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  logingWarn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    // private router: Router,
    public translate: TranslateService,
    private translatingService: TranslatingService,
    private location: Location

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

  ionViewDidEnter() {

    // Set default language
    this.translate.setDefaultLang(this.translatingService.defaultLang);
    if(this.authService.isLoggedIn()) {
      this.location.back()
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const loginFormData = new FormData();

    Object.keys(this.loginForm).map((key) => {
      loginFormData.append(key, this.loginForm[key].value);
    });

    this.authService.login(loginFormData).subscribe({
      next: (ans) => {
        this.localstorageService.setToken(ans.token);
        this.localstorageService.setUser(ans.id);
        // this.router.navigate(['/tabs']);
        this.location.back()
      },
      error: (err) => {
        this.logingWarn = true
      },
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.form.controls;
  }
}
