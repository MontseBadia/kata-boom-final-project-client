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

  randomKata: { name: string, functionName: string, parameters: [string], tests: [{ params: any }] };
  // DO NOT FORGET TO DECLARE AS [ ] --> MEMORY CRASHES!!
  allowQuotes: boolean;
  testAndSubmit = false;
  feedbackEnabled = false;
  error = null;
  randomKataId: any;
  passedTests: boolean;
  emptyEditor: boolean;
  randomKataResults: [any];

  // --- CODE EDITOR VARIABLES
  text: any;
  options: any = { maxLines: 1000, printMargin: false, useWorker: true };
  inputCode: any;

  constructor(private route: ActivatedRoute, private kataService: KataService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((kataName) => {
        this.kataService.getOne(kataName)
          .then((kata) => {
            this.randomKata = kata;
            this.randomKata.functionName = kata.functionName;
            this.randomKata.name = this.randomKata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME
            this.randomKata.parameters = kata.parameters;
            this.text = `function ${this.randomKata.functionName} (${this.randomKata.parameters}) {

}`;
            if (typeof (kata.tests[0].params[0]) === 'string') { // --- Puts params in quotes in case of strings
              for (let x = 0; x < kata.tests.length; x++) {
                for (let y = 0; y < kata.tests[x].params.length; y++) {
                  this.randomKata.tests[x].params[y] = '"' + this.randomKata.tests[x].params[y] + '"';
                  this.allowQuotes = true;
                }
              }
            } else {
              this.allowQuotes = false;
            }
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
    this.passedTests = false;
    this.emptyEditor = true;

    if (form.valid) {
      this.randomKataId = randomKataId; // Do I need this?

      if (this.testAndSubmit === false) { // ---- So that it does the check and not the submit
        this.kataService.checkKata(this.inputCode, this.randomKataId)
          .then((data) => {
            this.randomKataResults = data.evaluation;
            this.feedbackEnabled = true;
            if (data.isCorrect) {
              this.passedTests = true;
            }
            this.testAndSubmit = false;
            // stays in the same page
          })
          .catch((err) => {
            this.feedbackEnabled = true;
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
