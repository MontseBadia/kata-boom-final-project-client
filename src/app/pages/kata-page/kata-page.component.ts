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

export class KataPageComponent {

  // --- CODE EDITOR VARIABLES
  text: any;
  options: any = { maxLines: 1000, printMargin: false, useWorker: true };
  inputCode: any;

  randomKata: {
    name: string
  };
  testAndSubmit = false;

  feedbackEnabled = false;
  error = null;
  processing = false;

  randomKataId: any;

  passedTests: boolean;

  constructor(private kataService: KataService) {
    this.kataService.getRandom()
      .then((kata) => {
        this.randomKata = kata;
        // --- REPLACE DASHES OF FUNCTION NAME
        this.randomKata.name = this.randomKata.name.replace(/-/g, ' ');
      });
  }

  // --- SAVES INPUT CODE
  onChange(inputCode) {
    this.inputCode = inputCode;
  }

  handleSubmit(form, randomKataId) {
    this.error = '';
    this.feedbackEnabled = true;

    if (form.valid) {
      this.processing = true;
      this.randomKataId = randomKataId;

      if (this.testAndSubmit === false) {
        this.kataService.checkKata(this.inputCode, this.randomKataId)
          .then((isCorrect) => {
            if (isCorrect) {
              this.passedTests = true;
            } else {
              this.passedTests = false;
            }
            this.processing = false; // check if I need this
            this.testAndSubmit = false;
            // stays in the same page
          })
          .catch((err) => {
            this.error = err.error;
            this.processing = false;
            // this.feedbackEnabled = false;
          });

      } else {
        this.kataService.submitKata(this.inputCode, this.randomKataId)
          .then((result) => {
            this.processing = false;
            this.testAndSubmit = false;
            // stays in the same page
          })
          .catch((err) => {
            this.error = err.error;
            this.processing = false;
            // this.feedbackEnabled = false;
          });
      }
    }
  }

}
