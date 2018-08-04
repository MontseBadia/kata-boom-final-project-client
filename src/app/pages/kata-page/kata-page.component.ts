import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// --- IMPORTS FOR THE CODE EDITOR
import 'brace';
import 'brace/theme/twilight';
import 'brace/mode/javascript';

import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { KataService } from '../../services/kata.service';

@Component({
  selector: 'app-kata-page',
  templateUrl: './kata-page.component.html',
  styleUrls: ['./kata-page.component.css']
})

export class KataPageComponent implements OnInit {

  // --- CODE EDITOR VARIABLES
  text: any;
  options: any = { maxLines: 1000, printMargin: false, useWorker: true };
  inputCode: any = '';

  randomKata: { name: string };
  testAndSubmit = false;
  feedbackEnabled = false;
  error = null;
  randomKataId: any;
  passedTests: boolean;
  emptyEditor: boolean;

  constructor(private route: ActivatedRoute, private kataService: KataService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((kataName) => {
        this.kataService.getOne(kataName)
          .then((kata) => {
            this.randomKata = kata;
            this.randomKata.name = this.randomKata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME
          })
          .catch((err) => {
            this.router.navigate(['/**']); // Is this the correct way?
          });
      });
  }

  onChange(inputCode) {
    this.inputCode = inputCode;  // --- SAVES INPUT CODE
  }

  handleSubmit(form, randomKataId) {
    this.error = '';
    this.feedbackEnabled = true;
    this.passedTests = false;
    this.emptyEditor = true;

    if (form.valid) {
      this.randomKataId = randomKataId; // Do I need this?

      if (this.testAndSubmit === false) { // ---- So that it does the check and not the submit
        this.kataService.checkKata(this.inputCode, this.randomKataId)
          .then((isCorrect) => {
            if (isCorrect) {
              this.passedTests = true;
            }
            this.testAndSubmit = false;
            // stays in the same page
          })
          .catch((err) => {
            this.error = err.error;
            if (this.inputCode !== '') {
              this.emptyEditor = false;
            }
          });

      } else {
        this.kataService.submitKata(this.inputCode, this.randomKataId)
          .then((result) => {
            this.testAndSubmit = false;
            // stays in the same page
          })
          .catch((err) => {
            this.error = err.error;
            // this.feedbackEnabled = false;
          });
      }
    }
  }

}
