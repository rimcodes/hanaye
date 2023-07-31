import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  showPass = false;
  imageDisplay!: string | ArrayBuffer | null;
  panelOpenState!: boolean;
  location?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;

    const userFormData = new FormData();

    Object.keys(this.userForm).map((key) => {
      userFormData.append(key, this.userForm[key].value);
    });

    if (this.editMode) {
      // update
      this.updateUser(userFormData);
    } else {
      // create
      this.createUser(userFormData);
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  addCords(newCords: string) {
    this.userForm['location'].setValue(newCords);
    console.log(newCords, 'User form page');
  }

  // reused code for image upload
  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private createUser(userFormData: FormData) {
    this.usersService.createUser(userFormData).subscribe({
      next: (res) => {
        // Snackbar for creating property
        console.log(res);
        this.isSubmitted = false;
      },
      error: (err) => {
        // Snackbar for error
        console.log(err);
        this.isSubmitted = false;
      },
    });
  }

  private updateUser(userFormData: FormData) {
    this.usersService.createUser(userFormData).subscribe({
      next: (res) => {
        // Snackbar for creating property
        console.log(res);
        this.isSubmitted = false;
      },
      error: (err) => {
        // Snackbar for error
        console.log(err);
        this.isSubmitted = false;
      },
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.usersService.getUser(params['id']).subscribe((res) => {
          this.userForm['id'].setValue(res.id);
          this.userForm['name'].setValue(res.name);
          this.userForm['role'].setValue(res.role);
          this.userForm['active'].setValue(res.active);
          this.userForm['phone'].setValue(res.phone);
          this.userForm['address'].setValue(res.address);
          this.userForm['image'].setValue(res.image);
          this.userForm['location'].setValue(res.location);
        });
      }
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      password: [''],
      role: [''],
      active: [true],
      phone: [''],
      address: [''],
      image: [''],
      location: [''],
    });
  }

  get userForm() {
    return this.form.controls;
  }
}
