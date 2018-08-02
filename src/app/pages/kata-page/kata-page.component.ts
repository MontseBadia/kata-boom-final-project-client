import { Component, OnInit } from '@angular/core';

import { KataService } from '../../services/kata.service';

@Component({
  selector: 'app-kata-page',
  templateUrl: './kata-page.component.html',
  styleUrls: ['./kata-page.component.css']
})
export class KataPageComponent implements OnInit {

  randomKata: {
    name: string
  };

  constructor(private kataService: KataService) {
    this.kataService.getRandom()
      .then((kata) => {
        this.randomKata = kata;
        // --- REPLACE DASHES OF FUNCTION NAME
        this.randomKata.name = this.randomKata.name.replace(/-/g, ' ');
      });
  }

  ngOnInit() {
  }

}
