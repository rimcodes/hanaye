import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoresService } from 'src/app/services/stores.service';
import { UsersService } from 'src/app/services/users.service';
import { SnackMessageComponent } from 'src/app/ui/snack-message/snack-message.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  imageDisplay!: string | ArrayBuffer | null;
  stores$!: Observable<Store[]>;
  clients$!: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private locationService: Location,
    private productsService: ProductsService,
    private storesService: StoresService,
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.loadStores();
    this.loadClients();
  }

  onSubmit() {
    this.isSubmitted = true;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      // update
      this.updateProduct(productFormData);
    } else {
      // create
      this.createProduct(productFormData);
    }
  }

  loadStores() {
    this.stores$ = this.storesService.getAllStores();
  }

  loadClients() {
    this.clients$ = this.usersService.getWorkers();
  }

  private createProduct(productFormData: FormData) {
    this.productsService.createProduct(productFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.openSnackBar('تم انشاء متجر جديدة', 'انشاء متجر آخرى', 'success');
        timer(4000).subscribe(() => this.locationService.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'warn');
        console.log(err);

      },
    });
  }

  private updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.openSnackBar('تم تعديل متجر جديدة', 'انشاء متجر آخرى', 'success');
        timer(4000).subscribe(() => this.locationService.back());
      },
      error: (err) => {
        this.isSubmitted = false;
        this.openSnackBar('خطأ', 'حدث خطأ ما', 'success');
        console.log(err);

      },
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.productsService.getProduct(params['id']).subscribe((res) => {
          this.productForm['id'].setValue(res.id);
          this.productForm['worker'].setValue(res.worker);
          this.productForm['store'].setValue(res.store.id);
          this.productForm['title'].setValue(res.title);
          this.productForm['price'].setValue(res.price);
          this.productForm['details'].setValue(res.details);
          this.productForm['active'].setValue(res.active);
          this.productForm['image'].setValue(res.image);
        });
      }
    });
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
      worker: [''],
      store: ['', Validators.required],
      title: ['', Validators.required],
      price: [''],
      details: [''],
      active: [true],
      image: [''],
    });
  }

  openSnackBar(message: string, action: string, status: string) {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: 3 * 1000,
      data: { message, action, status },
    });
  }

  // refactoring getting form controls
  get productForm() {
    return this.form.controls;
  }
}
