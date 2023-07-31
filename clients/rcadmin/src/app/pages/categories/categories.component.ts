import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      id: 'c1',
      title: 'Category 1',
      details: 'Some details about category 1',
      active: true,
      image: 'assets/holders/cat1.png'
    },
    {
      id: 'c2',
      title: 'Category 2',
      details: 'Some details about category 2',
      active: true,
      image: 'assets/holders/cat2.jpg'
    },
    {
      id: 'c3',
      title: 'Category 3',
      details: 'Some details about category 3',
      active: true,
      image: 'assets/holders/cat3.jpg'
    },
  ]
}
