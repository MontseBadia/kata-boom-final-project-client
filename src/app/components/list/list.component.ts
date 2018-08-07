import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() katas: any;
  @Input() friends: any;
  @Input() myOwnKatas: any;
  @Input() myId: any;

  constructor() { }

  ngOnInit() {
    if (!this.myOwnKatas) {
      this.myOwnKatas = false;
    }
  }

}
