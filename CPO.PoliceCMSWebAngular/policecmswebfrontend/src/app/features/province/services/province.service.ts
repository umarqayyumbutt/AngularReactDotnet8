// features/provinces/services/province.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from '../models/province.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private apiUrl = 'https://localhost:44319/api/';  // Adjust to your API

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Province[]>(this.apiUrl+'Provinces/GetListProvince', { headers });
  }

  // Add other methods like getProvinceById, addProvince, editProvince, etc.
  // Method to delete a province by its ID
  deleteProvince(provinceId: number): Observable<void> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${provinceId}`, { headers });
  }

  addProvince(province: Province): Observable<Province> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');  // Explicitly set the content type
    return this.http.post<Province>(`${this.apiUrl}Provinces/AddProvince`, province, { headers });
  }
   // Fetch a province by ID
   getProvinceById(id: number): Observable<Province> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Province>(`${this.apiUrl}/Provinces/GetProvinceById/${id}`, { headers });
  }
   // Update an existing province
   updateProvince(province: Province): Observable<Province> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.put<Province>(`${this.apiUrl}/Provinces/UpdateProvince/${province.id}`, province, { headers });
  }
}
