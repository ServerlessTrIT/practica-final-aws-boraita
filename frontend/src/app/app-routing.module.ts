import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAccessComponent } from './public/not-access/not-access.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule),
  //   canActivateChild: [UserGuard]
  // },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotAccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
