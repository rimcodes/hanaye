import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Lang, TranslatingService } from 'src/app/services/translate.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  userId!: string;
  imageDisplay!: string | ArrayBuffer | null | undefined;
  langs: Lang[] = this.translatingService.langs;
  message!: string;
  defaultLang!: "ar" | "fr" | "en"

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private localstorage: LocalstorageService,
    public platform: Platform,
    private router: Router,
    public translate: TranslateService,
    private alertCtr: AlertController,
    private translatingService: TranslatingService
  ) {
    // Register translation languages
    this.translate.addLangs(['ar', 'fr']);
    // Set default language
    this.translate.setDefaultLang(translatingService.defaultLang);
    // document.dir = "rtl";
  }

  ngOnInit() {
    this._initForm();
    this._getUser();
    this.defaultLang = this.translatingService.defaultLang
  }

  onSubmit() {
    const profileFormData = new FormData();

    Object.keys(this.profileForm).map((key) => {
      profileFormData.append(key, this.profileForm[key].value);
    });

    this.authService.updateProfile(profileFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        // this.openSnackBar('تم تعديل مستخدم جديد', 'انشاء مستخدم آخر', 'success')
        // timer(6000)
        //   .subscribe(() => this.location.back())
      },
      error: (err) => {
        this.isSubmitted = false;
        // this.openSnackBar('عفوا, لقد حدث خطاء ما!', 'اعادة المحاولة', 'warning')
      },
    });
  }

  async deleteInit(message: string) {
    if (!this.userId) {
      console.log('UserId is invalid', this.userId);

      return;
    }
    this.authService.inintDeleteUser(message, this.userId).subscribe({
      next: (res) => {
        this.presentAlert('success').then(() => {
          this.authService.logout()
          this.router.navigate(['/login']);
        });
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        this.presentAlert('warning');
      },
    });
    // await this.presentAlert('success')
  }

  // Alert ctr
  async presentAlert(status: string) {
    const deleteSuccess: string = await firstValueFrom(this.translate.get("PROFILE.DELETE_DONE"))
    const deleteUnSuccess: string = await firstValueFrom(this.translate.get("PROFILE.DELETE_DONE"))
    console.log(deleteSuccess);

    const alert = await this.alertCtr.create({
      header:
        status === 'success'
          ? deleteSuccess
          : deleteUnSuccess,
      cssClass: status,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
      address: [''],
      email: [''],
    });
  }

  private _getUser() {
    this.userId = this.localstorage.getUser() ?? '';
    if (this.userId === '') {
      this.router.navigate(['', 'login']);
      return;
    }
    this.usersService.getUser(this.userId).subscribe(
      {
        next: (user: User) => {
          this.imageDisplay = user.image;
          this.profileForm['id'].setValue(user.id);
          this.profileForm['name'].setValue(user.name);
          this.profileForm['phone'].setValue(user.phone);
          this.profileForm['address'].setValue(user.address);

          this.profileForm['password'].setValidators([]);
          this.profileForm['password'].updateValueAndValidity();
        },
        error: (err) => {
          this.authService.logout()
          this.router.navigateByUrl('login')
        }
      }

    );
  }

  // Upload image and preview
  onImageUpload(event: any) {
    const file = event.target.files[0];

    const formImage = new FormData();
    if (file) {
      formImage.append('image', file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }

    // this.usersService.updateUser(formImage)
    if (this.userId) {
      this.authService.uploadImage(formImage, this.userId).subscribe({
        next: (res) => {
          this.isSubmitted = false;
          // this.openSnackBar('تم تعديل مستخدم جديد', 'انشاء مستخدم آخر', 'success')
          // timer(6000)
          //   .subscribe(() => this.location.back())
        },
        error: (err) => {
          this.isSubmitted = false;
          // this.openSnackBar('عفوا, لقد حدث خطاء ما!', 'اعادة المحاولة', 'warning')
        },
      });
    }
  }

  //Switch language
  translateLanguageTo(lang: 'ar' | 'fr' | 'en') {
    this.translatingService.defaultLang = lang
    this.translate.use(lang);
    if(lang === "fr" || lang === "en") {
      document.dir = "ltr";
    }
    if(lang === "ar") {
      document.dir = "rtl";
    }

    this.translatingService.setAppLang(lang)

    this.router.navigate(['login'])
  }

  // refactoring getting form controls
  get profileForm() {
    return this.form.controls;
  }
}
