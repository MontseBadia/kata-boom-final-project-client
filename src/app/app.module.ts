// ----- ANGULAR MODULES ------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// ----- EXTERNAL MODULES ------
import { AceEditorModule } from 'ng2-ace-editor';

// ----- COMPONENTS ------
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { KataCardComponent } from './components/kata-card/kata-card.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

// ----- PAGES ------
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { KataPageComponent } from './pages/kata-page/kata-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SearchFriendsComponent } from './pages/search-friends/search-friends.component';
import { FriendProfilePageComponent } from './pages/friend-profile-page/friend-profile-page.component';

// ----- SERVICES ------
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

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
  { path: 'profile/:name', component: FriendProfilePageComponent, canActivate: [RequireUserGuard] },
  { path: 'kata/:name', component: KataPageComponent, canActivate: [RequireUserGuard] },
  { path: 'friends', component: SearchFriendsComponent, canActivate: [RequireUserGuard] },
  { path: '**', component: NotFoundPageComponent },
  // { path: 'kata/**', component: NotFoundPageComponent } Does this need a guard?
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    KataPageComponent,
    NotFoundPageComponent,
    ListComponent,
    KataCardComponent,
    SearchFriendsComponent,
    FriendCardComponent,
    FriendProfilePageComponent,
    AddCommentComponent,
    CommentCardComponent,
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
    UserService,
    RequireAnonGuard,
    RequireUserGuard,
    InitAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
