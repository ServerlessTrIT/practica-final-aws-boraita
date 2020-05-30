import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>('https://tehqnbbl1i.execute-api.eu-central-1.amazonaws.com/DEV/login',
      { email, password })
      .pipe(tap(res => localStorage.setItem('access_token', res.access_token))
      );
  }
  register(email: string, password: string) {
    return this.http.post<{ access_token: string }>('http://www.your-server.com/auth/register', { email, password })
      .pipe(tap(res => this.login(email, password))
      );
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
