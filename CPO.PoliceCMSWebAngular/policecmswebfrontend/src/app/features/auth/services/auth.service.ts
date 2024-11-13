// features/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44319/api/';  // Replace with actual API URL

  constructor(private http: HttpClient) { }

  // Login method for authenticating user credentials
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}Auth/Login`, credentials).pipe(
      tap((response: any) => {
        console.log(response.token.result);
        // Store JWT token in local storage on successful login
        localStorage.setItem('jwtToken', response.token.result);
      })
    );
  }

  // Method to log out user by removing JWT token
  logout() {
    localStorage.removeItem('jwtToken');
  }

  // Check if the user is authenticated by verifying the presence of a token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  // Helper function to get JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
