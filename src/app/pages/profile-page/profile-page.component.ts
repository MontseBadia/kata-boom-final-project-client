import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { KataService } from '../../services/kata.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  kata: {};

  constructor(private kataService: KataService, private router: Router) { }

  ngOnInit() {
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
