import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../service/socket.service';
import {ChatParticipant} from '../../model/chatparticipant';
import {ScrollbarComponent} from 'ngx-scrollbar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild(ScrollbarComponent) scrollRef: ScrollbarComponent;

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
    this.scrollRef.scrollYTo(this.scrollRef.view.scrollHeight);
  }
}
