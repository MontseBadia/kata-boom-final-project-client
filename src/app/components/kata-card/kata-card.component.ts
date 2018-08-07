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

  @Input() kata: any;
  @Input() userId: any;
  @Input() myOwnKatas: any;
  @Input() myId: any;

  showAddComment = false;
  showComment = false;
  kataUserId: any;
  userKatas: any;
  friends: any;

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

        console.log(this.userKatas);
      })
      .catch(() => {
        this.router.navigate(['/**']);
      });
  }

  handleAddComment($event) {
    this.userService.addComment($event.comment, $event.userId, $event.kataId)
      .then(() => {
      })
      .catch(() => {
        this.router.navigate(['/**']);
      });
  }
}
