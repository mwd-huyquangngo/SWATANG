import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards';
import { ChangePasswordComponent } from './change-password';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ForgotPasswordComponent } from './forgot-password';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';
import { ResetPasswordComponent } from './reset-password';
import { SearchUserComponent } from './search-user/search-user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'profile/delete', component: DeleteAccountComponent, canActivate: [AuthGuard] },
  { path: 'search-user', component: SearchUserComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
