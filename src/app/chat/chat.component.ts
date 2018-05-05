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
  username: string = "Incognito";

  participants: Array<any> = [];
  privateMsg: string = "";
  sendTo: string = "";

  constructor(){
  }

  ngOnInit() {

  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({username: this.username}, function(_) {
      that.stompClient.subscribe("/chat/msg", (message) => {
        if(message.body) {
          that.messages.push(message.body);
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
      });
      that.stompClient.subscribe("/topic/chat.logout", msg => {
        if(msg.body) {
          const index: number = that.participants.indexOf(alert);
          that.participants.splice(index, 1);
        }
      });
      that.stompClient.subscribe("/chat/private/" + that.username, function(message) {
        const parsed = JSON.parse(message.body);
        that.messages.push(parsed.from + " send " + parsed.message + " to " + parsed.to);
      });
    });
  }

  onSendMessage(){
    this.stompClient.send("/api/send/msg" , {}, this.message);
    this.message = "";
  }


  onSendPrivateMessage() {
    this.stompClient.send("/api/chat.private." + this.sendTo,
              {}, JSON.stringify({message: this.privateMsg}));
    this.privateMsg = "";
  }
}
