import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KataService } from '../../services/kata.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  katas: any;
  username: string;
  feedbackEnabled = false;
  error = null;
  processing = false;

  constructor(private kataService: KataService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getMyKatas()
      .then((katas) => {
        this.katas = katas.katas;
      })
      .catch((err) => { // Do I need err?
        this.router.navigate(['/**']);
      });
  }

  getRandomKata() {
    this.kataService.getRandom()
      .then((kataName) => {
        if (!kataName) {
          this.router.navigate(['/kata/no-more-katas']);
        } else {
          this.router.navigate([`/kata/${kataName}`]);
        }
      })
      .catch((err) => {
        this.router.navigate(['/**']);
      });
  }

  submitFormSearchFriend(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.userService.getOneByName(this.username)
        .then((user) => {
          this.router.navigate([`/friends/${user.username}`]); // how to include search?name=username?
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
