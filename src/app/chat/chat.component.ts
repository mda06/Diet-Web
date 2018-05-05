import { Component, OnInit } from '@angular/core';
import {SocketService} from './service/socket.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'WebSockets chat';

  participants: Array<any> = [];
  message: string = "";
  username: string = "Incognito";

  selectedParticipant: any;

  constructor(public socket: SocketService){
  }

  ngOnInit() {

  }

  initializeWebSocketConnection() {
    this.socket.connect(this.username);
    this.handleParticipants();
    this.handleMessages();
  }

  private handleParticipants() {
    this.socket.participants$.subscribe(data => {
      data.forEach(part => part.messages = []);
      this.participants = data;
    });
    this.socket.chatLogin$.subscribe(data => {
      data.messages = [];
      this.participants.push(data);
    });
    this.socket.chatLogout$.subscribe(data => {
      const index: number = this.participants.indexOf(data);
      this.participants.splice(index, 1);
    });
  }

  private handleMessages() {
    this.socket.publicMessage$.subscribe(data => {
      this.participants.forEach(part => {
        part.hasUnreadMessages = true;
        part.messages.push({to: 'All', from: 'System', message: data});
      });
    });
    this.socket.privateMessage$.subscribe(msg => {
      let participant = this.participants.find(part => part.userName === msg.from);
      if(!isNullOrUndefined(participant)) {
        participant.hasUnreadMessages = true;
        participant.messages.push(msg);
      }
      participant = this.participants.find(part => part.userName === msg.to);
      if(!isNullOrUndefined(participant)) {
        participant.messages.push(msg);
      }
    });
  }

  onParticipantSelectedEvent(participant: any) {
    participant.hasUnreadMessages = false;
    this.selectedParticipant = participant;
  }

  onSendMessage(){
    this.socket.sendPublicMessage(this.message);
    this.message = "";
  }

}
