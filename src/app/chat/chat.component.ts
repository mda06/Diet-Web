import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/api/socket';
  title = 'WebSockets chat';
  private stompClient;

  message: string = "";
  messages: Array<string> = [];

  participants: Array<any> = [];

  constructor(){
  }

  ngOnInit() {

  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(_) {
      that.stompClient.subscribe("/chat/msg", (message) => {
        if(message.body) {
          that.messages.push(message.body);
          console.log(message.body);
        }
      });
      that.stompClient.subscribe("/api/chat.participants", msg => {
        if(msg.body) {
          that.participants = JSON.parse(msg.body);
        }
      });
      that.stompClient.subscribe("/topic/chat.login", msg => {
        if(msg.body) {
          that.participants.push(JSON.parse(msg.body));
        }
        console.log(msg);
      });
      that.stompClient.subscribe("/topic/chat.logout", msg => {
        if(msg.body) {
          const index: number = that.participants.indexOf(alert);
          that.participants.splice(index, 1);
        }
      });
    });
  }

  onSendMessage(){
    this.stompClient.send("/api/send/msg" , {}, this.message);
    this.message = "";
  }


}
