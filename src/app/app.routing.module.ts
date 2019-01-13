import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'users',
    loadChildren: './features/users/users.module#UsersModule'
  },
  {
    path: 'auth',
    loadChildren: './features/authentication/authentication.module#AuthenticationModule'
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
