import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  form: FormGroup;
  registerInvalid: boolean;
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    this.registerInvalid = false;
    if (this.form.valid) {
      this.authService.register(this.form.get('username').value, this.form.get('password').value)
        .subscribe(() => { }, () => this.router.navigate(['/validateAccount']));
    }
  }

}
