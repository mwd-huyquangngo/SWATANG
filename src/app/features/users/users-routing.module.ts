import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/profile',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'profile/delete', component: DeleteAccountComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
      { path: 'search-user', component: SearchUserComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
