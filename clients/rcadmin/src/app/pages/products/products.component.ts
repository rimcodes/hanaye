import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductsComponent implements OnInit {
  products!: Product[]

  dataSource = new MatTableDataSource(this.products)

  columnsToDisplay = ['title', 'store', 'createdAt', 'buttons'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Product | null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res
        this.dataSource = new MatTableDataSource(this.products)
      },
      error: (e) => {
        console.log(e);
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
