import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from 'src/app/product-service.service';
import { Category } from '../models/category';
import { ProductDto } from '../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { filterModel } from '../models/productsFilterModel';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.css'],
})
export class BrowseProductComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private formBuilder: FormBuilder
  ) {}
  form!: FormGroup;
  categoriesList: Category[] = [];
  products: ProductDto[] = [];
  displayedColumns = ['Category', 'Price', 'Description', 'ProductId'];
  dataSource!: MatTableDataSource<ProductDto[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getALlCategories();
    this.getAllProductus();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      categories: new FormControl('0'),
      fromPrice: new FormControl(),
      toPrice: new FormControl(),
    });
  }

  getAllProductus() {
    this.productService.getAllProduct().subscribe(
      (result) => {
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

  filterDataFromServer() {
    let model: filterModel = {
      category:
        this.form.get('categories')?.value == '0'
          ? null
          : this.form.get('categories')?.value,
      fromPrice: this.form.get('fromPrice')?.value,
      toPrice: this.form.get('toPrice')?.value,
    };

    this.productService.filterProduct(model).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        
      },
      (error) => console.log(error)
    );
  }
}
