import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KataService } from '../../services/kata.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  katas: any;
  username: string;
  myUser: string;
  feedbackEnabled = false;
  error = null;
  processing = false;
  showKatas = false;
  showFriends = false;
  friends: any;
  myOwnKatas = true;
  myId: any;
  randomKataError = false;
  myKatasError = false;
  myFriendsError = false;

  constructor(private kataService: KataService,
    private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.myId = this.authService.getUser()._id;
    this.myUser = this.authService.getUser();
    this.showKatas = true;
    this.showFriends = true;
    this.loadKatas();
    this.loadFriends();
  }

  toggleMyKatas() {
    if (this.showKatas && !this.katas) {
      this.loadKatas();
    }
    this.showKatas = !this.showKatas;
  }

  toggleMyFriends() {
    if (!this.showFriends && this.katas) {
      this.loadFriends();
    }
    this.showFriends = !this.showFriends;
  }

  loadKatas() {
    this.myKatasError = false;
    this.userService.getMyKatas()
      .then((katas) => {
        this.katas = katas.katas;
      })
      .catch((err) => {
        console.log(err);
        this.myKatasError = true;
      });
  }

  loadFriends() {
    this.myFriendsError = false;
    this.userService.getMyFriends()
      .then((friends) => {
        this.friends = friends.friends;
        if (this.friends.length === 0) {
          this.friends = null;
        }
      })
      .catch((err) => {
        console.log(err);
        this.myFriendsError = true;
        // this.router.navigate(['/**']);
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
        console.log(err);
        this.randomKataError = true;
      });
  }

  submitFormSearchFriend(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.userService.getOneByName(this.username)
        .then((user) => {
          this.router.navigate(['friends'], { queryParams: { name: user.username } });
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
