import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface SignInResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // or your NestJS server URL

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signup`, { username, password });
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/api/auth/signin`, { username, password });
  }

  storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
