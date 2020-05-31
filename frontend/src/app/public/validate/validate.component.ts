import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {

  loginInvalid: boolean;
  form = new FormGroup({
    username: new FormControl(''),
    code: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      this.authService.validateUser(this.form.get('username').value, this.form.get('code').value)
        .subscribe(() => this.router.navigate(['/']), () => this.router.navigate(['/']));
    }
  }

}
