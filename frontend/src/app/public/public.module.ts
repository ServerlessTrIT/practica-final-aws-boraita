import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';



import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { ValidateComponent } from './validate/validate.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [LoginComponent, ValidateComponent, RegisterComponent, MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class PublicModule { }
