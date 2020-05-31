import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
