import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44367/api/Product/GetAllProducts';

  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/GetAllProducts`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Category/GetCategories`);
  }
}
