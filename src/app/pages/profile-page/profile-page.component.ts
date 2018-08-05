import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { KataService } from '../../services/kata.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  katas: any;

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
        this.router.navigate([`/kata/${kataName}`]);
      })
      .catch((err) => {
        this.router.navigate(['/**']);
      });
  }
}
