import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44367/api';

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Admin/GetUsersWithRoles`);
  }
}
