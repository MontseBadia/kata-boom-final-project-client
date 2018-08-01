import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

// ----- COMPONENTS ------
import { AppComponent } from './app.component';

// ----- PAGES ------
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// ----- SERVICES ------
import { AuthService } from './services/auth.service';

// ----- ROUTES ------
const routes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
