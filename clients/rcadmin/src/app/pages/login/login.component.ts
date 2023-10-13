import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  showPass = false;
  loading!: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    timer(2000).subscribe((n) => {
      this.loading = true
    })
    this._initForm()
  }

  onSubmit() {
    const loginFormData = new FormData()

    Object.keys(this.loginForm).map((key) => {
      loginFormData.append(key, this.loginForm[key].value);
    })

    this.authService.login(loginFormData)
      .subscribe((ans) => {
        this.localstorageService.setToken(ans.token);
        this.localstorageService.setUser(ans.id);
        this.authService.userId = ans.id
        this.router.navigate(['/'])
      })

  }

  private _initForm() {

    this.form = this.formBuilder.group({
      phone: [null, Validators.required],
      password: [null, Validators.required]
    })

  }

  get loginForm() {
    return this.form.controls
  }

  showPassword() {
    this.showPass = !this.showPass;
  }
}
