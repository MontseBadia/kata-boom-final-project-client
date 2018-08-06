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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.kata.kata.name = this.kata.kata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME
  }

  // getKataSolution(kataId) {
  //   this.userService.getMyKataSolution(kataId)
  //     .then(() => {
  //       this.router.navigate(['/kata/:name/edit']); // does it work?
  //     })
  //     .catch((err) => {
  //       this.router.navigate(['/**']);
  //     });
  // }

}
