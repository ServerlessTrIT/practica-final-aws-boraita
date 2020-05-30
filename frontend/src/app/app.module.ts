import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth.service';
import { MainModule } from './components/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter => localStorage.getItem('access_token'),
        whitelistedDomains: [''],
        blacklistedRoutes: ['https://tehqnbbl1i.execute-api.eu-central-1.amazonaws.com/DEV/']
      }
    }),
    MainModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
