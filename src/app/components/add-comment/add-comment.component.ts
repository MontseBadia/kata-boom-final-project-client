import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() kataId: any;
  @Input() userId: any;
  @Output() addNewComment = new EventEmitter<any>();

  comment: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitFormAddComment(form) {
    if (form.valid) {
      const eventData = {
        comment: this.comment,
        userId: this.userId,
        kataId: this.kataId
      };
      this.addNewComment.emit(eventData);
    }
  }

}


