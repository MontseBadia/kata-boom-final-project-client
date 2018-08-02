import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import 'brace';
import 'brace/theme/twilight';
import 'brace/mode/javascript';

import { KataService } from '../../services/kata.service';

@Component({
  selector: 'app-kata-page',
  templateUrl: './kata-page.component.html',
  styleUrls: ['./kata-page.component.css']
})

export class KataPageComponent implements OnInit {
  text: any;
  options: any = { maxLines: 1000, printMargin: false, useWorker: true };

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

  onChange(code) {
    console.log('new code', code);
  }

  ngOnInit() {
  }

}
