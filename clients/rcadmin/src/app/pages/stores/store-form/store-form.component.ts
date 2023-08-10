import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { StoresService } from 'src/app/services/stores.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  form!: FormGroup
  isSubmitted = false
  editMode = false
  imageDisplay!: string | ArrayBuffer | null
  panelOpenState!: boolean;
  location?: string;
  clients$!: Observable<User[]>

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.checkEditMode()
    this.loadClients()
  }

  loadClients() {
    this.clients$ = this.usersService.getWorkers()
  }

  onSubmit() {
    this.isSubmitted = true

    const storeFormData = new FormData()

    Object.keys(this.storeForm).map((key) => {
      storeFormData.append(key, this.storeForm[key].value);
    })

    if (this.editMode) {
      // update
      this.updateStore(storeFormData)
    } else {
      // create
      this.createStore(storeFormData)
    }
  }

  addCords(newCords: string) {
    this.storeForm['location'].setValue(newCords);
    console.log(newCords, 'User form page');
  }


  private createStore(storeFormData: FormData) {
    this.storesService.createStore(storeFormData)
      .subscribe({
        next: (res) => {
          this.isSubmitted = false
          console.log(res);

        },
        error: (err) => {
          this.isSubmitted = false

          console.log(err);
        }
      })
  }

  private updateStore(storeFormData: FormData) {
    this.storesService.updateStore(storeFormData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true
        this.storesService.getStore(params['id'])
          .subscribe((res) => {
            this.storeForm['id'].setValue(res.id)
            this.storeForm['worker'].setValue(res.worker)
            this.storeForm['name'].setValue(res.name)
            this.storeForm['details'].setValue(res.details)
            this.storeForm['active'].setValue(res.active)
            this.storeForm['location'].setValue(res.location)
            this.storeForm['image'].setValue(res.image)
          })
      }
    })
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

  private initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      worker: ['', Validators.required],
      name: ['', Validators.required],
      details: [''],
      active: [true],
      location: [''],
      image: [''],
    })
  }

  // refactoring getting form controls
  get storeForm() {
    return this.form.controls
  }

}
