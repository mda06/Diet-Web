import { Component, OnInit } from '@angular/core';
import {SocketService} from './service/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'WebSockets chat';

  message: string = "";
  messages: Array<string> = [];
  username: string = "Incognito";

  participants: Array<any> = [];
  privateMsg: string = "";
  sendTo: string = "";

  constructor(private socket: SocketService){
  }

  ngOnInit() {

  }

  initializeWebSocketConnection() {
    this.socket.connect(this.username);
    this.socket.participants$.subscribe(data => this.participants = data);
    this.socket.publicMessage$.subscribe(data => this.messages.push(data == null ? "NULL" : data));
    this.socket.privateMessage$.subscribe(data => this.messages.push(data.from + " send " + data.message + " to " + data.to));
    this.socket.chatLogin$.subscribe(data => this.participants.push(data));
    this.socket.chatLogout$.subscribe(data => {
      const index: number = this.participants.indexOf(data);
      this.participants.splice(index, 1);
    });
  }

  onSendMessage(){
    this.socket.sendPublicMessage(this.message);
    this.message = "";
  }

  onSendPrivateMessage() {
    this.socket.sendPrivateMessage(this.sendTo, this.privateMsg);
    this.privateMsg = "";
  }
}
