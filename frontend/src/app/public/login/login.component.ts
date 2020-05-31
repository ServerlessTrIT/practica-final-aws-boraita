import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }
  loginInvalid: boolean;
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      this.authService.login(this.form.get('username').value, this.form.get('password').value)
        .subscribe(() => this.router.navigate(['/home']), (err) => this.loginInvalid = true);
    }
  }

}
