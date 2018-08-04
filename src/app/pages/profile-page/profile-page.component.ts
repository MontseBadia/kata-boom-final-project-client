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
  kataName: string;

  constructor(private kataService: KataService, private router: Router) { }

  ngOnInit() {
  }

  getRandomKata() {
    this.kataService.getRandom()
      .then((kata) => {
        this.kataName = kata.name;
        this.router.navigate([`/kata/${this.kataName}`]);
      })
      .catch((err) => {
        this.router.navigate(['/**']);
      });
  }
}
