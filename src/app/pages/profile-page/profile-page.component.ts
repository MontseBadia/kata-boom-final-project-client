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
  kataId: any;

  constructor(private kataService: KataService, private router: Router) { }

  ngOnInit() {
  }

  getRandomKata() {
    this.kataService.getRandom()
      .then((kata) => {
        this.kataId = kata._id;
        this.router.navigate([`/kata/${this.kataId}`]);
      })
      .catch((err) => {
        // do something
      });
  }
}
