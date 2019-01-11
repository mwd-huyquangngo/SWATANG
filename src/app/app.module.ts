import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_components';
import { BioComponent } from './_control-components/bio/bio.component';
import { CompanyComponent } from './_control-components/company/company.component';
import { EmailComponent } from './_control-components/email/email.component';
import { LoadingComponent } from './_control-components/loading/loading.component';
import { LocationComponent } from './_control-components/location/location.component';
import { NameComponent } from './_control-components/name/name.component';
import { PasswordComponent } from "./_control-components/password/password.component";
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { ChangePasswordComponent } from './change-password';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ForgotPasswordComponent } from './forgot-password';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';
import { ResetPasswordComponent } from './reset-password';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    SearchUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoadingComponent,
    NameComponent,
    BioComponent,
    LocationComponent,
    CompanyComponent,
    EmailComponent,
    PasswordComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
