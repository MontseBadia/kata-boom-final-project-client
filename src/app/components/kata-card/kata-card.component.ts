import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-kata-card',
  templateUrl: './kata-card.component.html',
  styleUrls: ['./kata-card.component.css']
})

export class KataCardComponent implements OnInit {

  @Input() kata: { kata: { name: any }, _id: any };
  @Input() userId: any;
  @Input() myOwnKatas: any;
  @Input() myId: any;

  showAddComment = false;
  showComment = false;
  kataUserId: any;
  userKatas: any;
  friends: any;
  error = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userId) {
      this.kataUserId = this.userId;
    } else {
      this.kataUserId = this.myId;
    }

    this.kata.kata.name = this.kata.kata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME

    this.userService.retrieveKataComments(this.kataUserId, this.kata._id)
      .then((katas) => {
        this.userKatas = katas.katas[0];
        if (this.userKatas.length === 0) {
          this.userKatas = null;
        }
      })
      .catch((err) => {
        this.error = err.error;
        this.router.navigate(['/**']);
      });
  }

  handleAddComment($event) {
    this.showAddComment = false;
    this.userService.addComment($event.comment, $event.userId, $event.kataId)
      .then(() => {
        this.ngOnInit();
      })
      .catch((err) => {
        this.error = err.error;
        this.router.navigate(['/**']);
      });
  }

  handleRemoveComment($event) {
    this.userService.removeComment($event.commentId)
      .then(() => {
        this.ngOnInit();
      })
      .catch((err) => {
        this.error = err.error; // Is this ok??
        this.router.navigate(['/**']);
      });
  }
}
