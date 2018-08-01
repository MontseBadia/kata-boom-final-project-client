import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
