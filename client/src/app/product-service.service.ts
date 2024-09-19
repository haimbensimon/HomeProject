import { Product } from './products/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filterModel } from './products/models/productsFilterModel';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44367/api';

  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/GetAllProducts`);
  }
  addProduct(model: Product): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Product/AddProduct`, model);
  }
  removeProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/RemoveProduct/${id}`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Category/GetCategories`);
  }
  filterProduct(model: filterModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Product/FilterProducts`, model);
  }
}
