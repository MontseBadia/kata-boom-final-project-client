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

  showComment = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.kata.kata.name = this.kata.kata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME
    console.log(this.myOwnKatas);
  }

  handleAddComment($event) {
    this.userService.addComment($event.comment, $event.userId, $event.kataId)
      .then((user) => {
        console.log(user);
      })
      .catch(() => {
        this.router.navigate(['/**']);
      });
  }
}
