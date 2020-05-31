import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }
  users = [];
  userInvalid = false;
  userSubscription: Subscription;
  form = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl('')
  });
  userSelected;

  ngOnInit(): void {
    this.getUsers();
  }
  onSubmit() {
    if (this.form.valid) {
      this.userService.saveUser(
        this.form.get('name').value,
        this.form.get('surname').value,
        this.form.get('gender').value)
        .subscribe((user) => { this.users.push(user); this.form.reset(); });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: [{ id: { S }, name: { S }, surname: { S }, gender: { S } }]) => {
      this.users = users.map(user => ({
        id: user.id.S,
        name: user.name.S,
        surname: user.surname.S,
        gender: user.gender.S
      }));
    });
  }

  removeUser() {
    const idDelete = this.userSelected[0].id;
    this.userService.removeUser(idDelete)
      .subscribe(() => {
        this.users = this.users.filter(user => user.id !== idDelete);
        this.userSelected = null;
      });
  }

}
