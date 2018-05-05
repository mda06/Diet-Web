import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class SocketService {
  private serverUrl = 'http://localhost:8080/api/socket';
  private stompClient;
  private _username: string;

  private publicMsg = new ReplaySubject<any>(1);
  publicMessage$ = this.publicMsg.asObservable();
  private privateMsg = new ReplaySubject<any>(1);
  privateMessage$ = this.privateMsg.asObservable();
  private chatLogin = new ReplaySubject<any>(1);
  chatLogin$ = this.chatLogin.asObservable();
  private chatLogout = new ReplaySubject<any>(1);
  chatLogout$ = this.chatLogout.asObservable();
  private participants = new ReplaySubject<any>(1);
  participants$ = this.participants.asObservable();

  constructor() { }

  connect(username: string){
    this._username = username;
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({username: username}, function(_) {
      that.initPublicMessage();
      that.initPrivateMessage(username);
      that.initParticipants();
      that.initChatLogin();
      that.initChatLogout();
    });
  }

  private initPublicMessage() {
    this.stompClient.subscribe("/chat/msg", (msg) => {
      if(msg.body) {
        this.publicMsg.next(msg.body);
      }
    });
  }

  private initPrivateMessage(username: String) {
    this.stompClient.subscribe("/chat/private/" + username, msg => {
      if(msg.body) {
        this.privateMsg.next(JSON.parse(msg.body));
      }
    });
  }

  private initParticipants() {
    this.stompClient.subscribe("/api/chat.participants", msg => {
      if(msg.body) {
        this.participants.next(JSON.parse(msg.body));
      }
    });
  }

  private initChatLogin() {
    this.stompClient.subscribe("/topic/chat.login", msg => {
      if(msg.body) {
        this.chatLogin.next(JSON.parse(msg.body));
      }
    });
  }

  private initChatLogout() {
    this.stompClient.subscribe("/topic/chat.logout", msg => {
      if(msg.body) {
        this.chatLogout.next(JSON.parse(msg.body));
      }
    });
  }

  sendPublicMessage(msg: String): Observable<any> {
    return this.stompClient.send("/api/send/msg" , {}, msg);
  }

  sendPrivateMessage(to: String, msg: String): Observable<any> {
    return this.stompClient.send("/api/chat.private." + to,
      {}, JSON.stringify({message: msg}));
  }

  get username(): string {
    return this._username;
  }
}
