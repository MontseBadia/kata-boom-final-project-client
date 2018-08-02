// ----- MODULES ------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { AceEditorModule } from 'ng2-ace-editor';

// ----- COMPONENTS ------
import { AppComponent } from './app.component';

// ----- PAGES ------
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { KataPageComponent } from './pages/kata-page/kata-page.component';

// ----- SERVICES ------
import { AuthService } from './services/auth.service';

// ----- GUARDS ------
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { InitAuthGuard } from './guards/init-auth.guard';

// ----- ROUTES ------
const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [InitAuthGuard] },
  { path: 'signup', component: SignupPageComponent, canActivate: [RequireAnonGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [RequireAnonGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [RequireUserGuard] },
  { path: 'kata/:name', component: KataPageComponent, canActivate: [RequireUserGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    KataPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AceEditorModule
  ],
  providers: [
    AuthService,
    RequireAnonGuard,
    RequireUserGuard,
    InitAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
