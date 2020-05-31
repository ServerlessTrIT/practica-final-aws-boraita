import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { keys } from '../credentials';
import { tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'x-api-key': keys.API_KEY, Authorization: 'Bearer ' + localStorage.getItem('access_token') },
  )
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(name: string, surname: string, gender: string) {
    const id = new Date().getTime().toString();
    return this.http.post<{ access_token: string }>(keys.AUTH_API + 'monitorua',
      { id, name, surname, gender }, httpOptions);
  }
  getUsers() {
    return this.http.get(keys.AUTH_API + 'monitorua', httpOptions).pipe(map((users: { Items }) => users.Items));
  }
  removeUser(id: string) {
    httpOptions['body'] = { id };
    return this.http.delete(keys.AUTH_API + 'monitorua', httpOptions);
  }
}
