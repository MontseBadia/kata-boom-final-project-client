import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-kata-card',
  templateUrl: './kata-card.component.html',
  styleUrls: ['./kata-card.component.css']
})

export class KataCardComponent implements OnInit {

  @Input() kata: any;

  constructor() { }

  ngOnInit() {
    this.kata.kata.name = this.kata.kata.name.replace(/-/g, ' '); // --- REPLACE DASHES OF FUNCTION NAME
  }

}
