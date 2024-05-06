import { Component, Inject } from '@angular/core';
import { MessageData } from '../../models/message-data.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageData) {
  }

}
