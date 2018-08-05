import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  feedbackEnabled = false;
  error = null;
  processing = false;
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.authService.login(this.username, this.password)
        .then(() => {
          this.router.navigate(['/profile']);
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
