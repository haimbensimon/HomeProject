import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<any> {
    return this.http.get<any>(
      'https://localhost:44367/api/Product/GetAllProducts'
    );
  }
}
