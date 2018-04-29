import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;

  message: string = "";
  messages: Array<string> = [];

  constructor(){
    this.initializeWebSocketConnection();
  }

  ngOnInit() {

  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        console.log(message);
        if(message.body) {
          this.messages.push(message.body);
          console.log(message.body);
        }
      });
    });
  }

  onSendMessage(){
    this.stompClient.send("/app/send/message" , {}, this.message);
    this.message = "";
  }


}
