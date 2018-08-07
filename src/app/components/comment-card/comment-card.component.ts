import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})

export class CommentCardComponent implements OnInit {

  @Input() userKatas: any;
  @Input() myOwnKatas: any;
  @Output() removeComment = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleRemoveOneComment(commentId) {
    const eventInfo = {
      commentId: commentId,
    };
    this.removeComment.emit(eventInfo);
  }

}
