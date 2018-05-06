import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../service/socket.service';
import {ChatParticipant} from '../../model/chatparticipant';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() participant: ChatParticipant;
  @Input() socket: SocketService;

  message: String = "";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    this.socket.sendPrivateMessage(this.participant.authId, this.message);
    this.participant.hasUnreadMessages = false;
    this.message = "";
  }
}
