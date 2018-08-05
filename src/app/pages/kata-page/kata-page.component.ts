import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

// --- IMPORTS FOR THE CODE EDITOR
import 'brace';
import 'brace/theme/twilight';
import 'brace/mode/javascript';

import { KataService } from '../../services/kata.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-kata-page',
  templateUrl: './kata-page.component.html',
  styleUrls: ['./kata-page.component.css']
})

export class KataPageComponent implements OnInit {

  randomKata: { name: string, functionName: string, parameters: [string], tests: [{ params: any, result: any }] };
  // DO NOT FORGET TO DECLARE AS [ ] --> MEMORY CRASHES!!
  oneParameter: boolean;
  testAndSubmit = false;
  ableToSubmit = false;
  alreadySubmitted = false;
  feedbackEnabled = false;
  error = null;
  randomKataId: any;
  passedTests: boolean;
  emptyEditor: boolean;
  randomKataResults: [any];
  finalStatus: [any];

  // --- CODE EDITOR VARIABLES
  text: any;
  options: any = { maxLines: 1000, printMargin: false, useWorker: true };
  inputCode: any;

  constructor(private route: ActivatedRoute, private kataService: KataService, private userService: UserService, private router: Router) { }

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
            if (this.randomKata.tests[0].params.length === 1) {
              this.oneParameter = true;
            } else {
              this.oneParameter = false;
            }
            if (typeof (this.randomKata.tests[0].result) === 'string') {
              for (let x = 0; x < this.randomKata.tests.length; x++) {
                this.randomKata.tests[x].result = '"' + this.randomKata.tests[x].result + '"';
              }
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
    this.ableToSubmit = false;
    this.alreadySubmitted = false;

    if (form.valid) {
      this.randomKataId = randomKataId; // Do I need this?
      this.feedbackEnabled = true;
      this.randomKataResults = undefined;

      this.kataService.checkKata(this.inputCode, this.randomKataId)
        .then((data) => {
          this.randomKataResults = data.evaluation;
          this.finalStatus = data.finalStatus;
          for (let x = 0; x < this.randomKataResults.length; x++) {
            if (typeof (this.randomKataResults[x]) === 'string') {
              this.randomKataResults[x] = '"' + this.randomKataResults[x] + '"';
            }
          }
          if (data.isCorrect) {
            this.passedTests = true;
            this.ableToSubmit = true;
            if (this.testAndSubmit === true) {
              this.userService.submitKata(this.inputCode, this.randomKataId)
                .then(() => {
                  this.alreadySubmitted = true;
                  this.ableToSubmit = false;
                });
            }
          }
        })

        .catch((err) => {
          this.testAndSubmit = false;
          this.passedTests = false;
          this.ableToSubmit = false;
          this.error = err.error;
          if (this.inputCode !== '') {
            this.emptyEditor = false;
          }
        });
    }
  }
}
