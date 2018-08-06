import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})

export class SearchFriendsComponent implements OnInit {

  user: any;
  feedbackEnabled = false;
  error = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.userService.getOneByName(params.name)
          .then((user) => {
            this.user = user;
          });
      });
  }

  addFriend(user) {
    this.error = '';
    this.feedbackEnabled = true;
    this.userService.addOneFriend(user._id)
      .then(() => {
        this.router.navigate(['/profile']); // should navigate to my friends
      })
      .catch((err) => {
        this.error = err.error;
        this.feedbackEnabled = false;
      });
  }

}
