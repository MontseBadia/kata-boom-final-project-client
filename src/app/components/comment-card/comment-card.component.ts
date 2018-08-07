import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})

export class CommentCardComponent implements OnInit {

  @Input() userKatas: any;

  constructor() { }

  ngOnInit() {
  }

}
