import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ChatParticipant} from '../../model/chatparticipant';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SocketService {
  private serverUrl = 'http://localhost:8080/api/socket';
  private stompClient;
  private _authId: string;

  private publicMsg = new ReplaySubject<any>(100);
  publicMessage$ = this.publicMsg.asObservable();
  private privateMsg = new ReplaySubject<any>(100);
  privateMessage$ = this.privateMsg.asObservable();
  private chatLogin = new ReplaySubject<ChatParticipant>(100);
  chatLogin$ = this.chatLogin.asObservable();
  private chatLogout = new ReplaySubject<ChatParticipant>(100);
  chatLogout$ = this.chatLogout.asObservable();
  private participants = new ReplaySubject<Array<ChatParticipant>>(100);
  participants$ = this.participants.asObservable();

  private subscriptions = new Subscription();

  constructor() {}

  connect(authId: string){
    this._authId = authId;
    console.log("Connecting: ");
    console.log(this.stompClient);
    let ws = new SockJS(this.serverUrl);
    console.log(ws)
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({authId: authId}, function(_) {
      console.log("Im connected motherfucker");
      that.initPublicMessage();
      that.initPrivateMessage(authId);
      that.initParticipants();
      that.initChatLogin();
      that.initChatLogout();
    });
  }

  private initPublicMessage() {
    this.subscriptions.add(this.stompClient.subscribe("/chat/msg", (msg) => {
      if(msg.body) {
        this.publicMsg.next(msg.body);
      }
    }));
  }

  private initPrivateMessage(authId: String) {
    this.subscriptions.add(this.stompClient.subscribe("/chat/private/" + authId, msg => {
      if(msg.body) {
        this.privateMsg.next(JSON.parse(msg.body));
      }
    }));
  }

  private initParticipants() {
    this.subscriptions.add(this.stompClient.subscribe("/api/chat.participants", msg => {
      if(msg.body) {
        this.participants.next(JSON.parse(msg.body));
      }
    }, other => console.log(other)));
  }

  private initChatLogin() {
    this.subscriptions.add(this.stompClient.subscribe("/topic/chat.login", msg => {
      if(msg.body) {
        this.chatLogin.next(JSON.parse(msg.body));
      }
    }));
  }

  private initChatLogout() {
    this.subscriptions.add(this.stompClient.subscribe("/topic/chat.logout", msg => {
      if(msg.body) {
        this.chatLogout.next(JSON.parse(msg.body));
      }
    }));
  }

  sendPublicMessage(msg: String): Observable<any> {
    if(msg)
      return this.stompClient.send("/api/send/msg" , {}, msg);
  }

  sendPrivateMessage(to: String, msg: String): Observable<any> {
    if(msg && to)
      return this.stompClient.send("/api/chat.private." + to, {}, JSON.stringify({message: msg}));
  }

  isConnected(): boolean {
    return this.stompClient != null && this.stompClient.connected;
  }

  logout() {
    if(!this.isConnected()) return;
    /*this.publicMsg.complete();
    this.privateMsg.complete();
    this.participants.complete();
    this.chatLogout.complete();
    this.chatLogin.complete();*/
    this.subscriptions.unsubscribe();
    this.stompClient.disconnect();
    console.log(this.stompClient);
  }

  get authId(): string {
    return this._authId;
  }

}
