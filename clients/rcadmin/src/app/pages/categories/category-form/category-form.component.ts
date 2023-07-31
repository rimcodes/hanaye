import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup
  isSubmitted = false
  editMode = false
  imageDisplay!: string | ArrayBuffer | null

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService:CategoriesService
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true

    const categoryFormData = new FormData()

    Object.keys(this.categoryForm).map((key) => {
      categoryFormData.append(key, this.categoryForm[key].value);
    })

    if (this.editMode) {
      // update
      this.updateCategory(categoryFormData)
    } else {
      // create
      this.createCategory(categoryFormData)
    }
  }

  private createCategory(categoryFormData: FormData) {
    this.categoriesService.createCategory(categoryFormData)
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

  private updateCategory(categoryFormData: FormData) {
    this.categoriesService.updateCategory(categoryFormData)
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
        this.categoriesService.getCategory(params['id'])
          .subscribe((res) => {
            this.categoryForm['id'].setValue(res.id)
            this.categoryForm['title'].setValue(res.title)
            this.categoryForm['details'].setValue(res.details)
            this.categoryForm['image'].setValue(res.image)
            this.categoryForm['active'].setValue(res.active)
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
      title: ['', Validators.required],
      details: [''],
      image: [''],
      color: [''],
      active: [true]
    })
  }

  // refactoring getting form controls
  get categoryForm() {
    return this.form.controls
  }

}
