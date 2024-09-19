import { Product } from './../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductServiceService } from 'src/app/product-service.service';
import { Category } from '../models/category';
import { ProductDto } from '../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar
  ) {}
  form!: FormGroup;
  categoriesList: Category[] = [];
  products: ProductDto[] = [];
  displayedColumns = [
    'ProductId',
    'Description',
    'Price',
    'Category',
    'action',
  ];
  dataSource!: MatTableDataSource<ProductDto[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.initForm();
    this.getALlCategories();
    this.getAllProductus();
  }
  initForm() {
    this.form = this.formBuilder.group({
      categories: new FormControl(),
      price: new FormControl(),
      desc: new FormControl(),
    });
  }

  getAllProductus() {
    this.productService.getAllProduct().subscribe(
      (result) => {
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error)
    );
  }

  getALlCategories() {
    this.productService.getAllCategory().subscribe(
      (result) => {
        this.categoriesList = result;
      },
      (error) => console.log(error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addProduct() {
    if (this.form.invalid) {
      return;
    }

    let model: Product = {
      desc: this.form.get('desc')?.value,
      price: this.form.get('price')?.value,
      categoryId: this.form.get('categories')?.value,
    };

    this.productService.addProduct(model).subscribe(
      (result) => {
        this.getAllProductus();
      },
      (err) => {
        this._snack.open(err.error.text, '', {
          duration: 3000,
        });
      }
    );
  }

  removeProduct(id: number) {
    this.productService.removeProduct(id).subscribe(
      (result) => {
        this.getAllProductus();
      },
      (err) => {
        this._snack.open(err.error.text, '', {
          duration: 3000,
        });
      }
    );
  }
}
