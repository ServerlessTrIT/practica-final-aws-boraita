import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { keys } from '../credentials';

const httpOptions = {
  headers: new HttpHeaders({ 'x-api-key': keys.API_KEY })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(keys.AUTH_API + 'login',
      { username, password }, httpOptions)
      .pipe(tap(res => localStorage.setItem('access_token', res.access_token))
      );
  }
  register(username: string, password: string) {
    return this.http.post<{ access_token: string }>(keys.AUTH_API + 'signup', { username, password }, httpOptions)
      .pipe(tap(res => this.login(username, password))
      );
  }
  validateUser(username: string, code: string) {
    return this.http.post<{ access_token: string }>(keys.AUTH_API + 'confirmsignup', { username, code }, httpOptions);
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
