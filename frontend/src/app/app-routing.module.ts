import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAccessComponent } from './public/not-access/not-access.component';
import { LoginGuard } from './public/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/main.module').then(m => m.MainModule),
    canActivate: [LoginGuard]
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotAccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
