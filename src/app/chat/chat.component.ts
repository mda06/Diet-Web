import {AfterContentChecked, AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from './service/socket.service';
import {isNullOrUndefined} from "util";
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {ChatParticipant} from '../model/chatparticipant';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  selectedParticipant: ChatParticipant;
  participants: Array<ChatParticipant> = [];

  authId: string = "";
  private isConnecting: boolean = false;


  constructor(public socket: SocketService,
              private authService: AuthenticationService){
  }

  ngOnInit() {
    this.authService.getConnectedUser().subscribe(
      user => {
        this.authId = user.authId;
        this.selectedParticipant = null;
        this.participants = [];
        this.isConnecting = false;
        this.initializeWebSocketConnection();
      },
      err => {console.log("Error trying to get the connected user");}
    );
  }

  initializeWebSocketConnection() {
    if(this.isConnecting) return;
    this.isConnecting = true;
    this.socket.connect(this.authId);
    this.handleSubscribes();
  }

  private handleSubscribes() {
    this.handleParticipants();
    this.handleMessages();
  }

  private handleParticipants() {
    this.socket.participants$.subscribe(data => {
      this.isConnecting = false;
      data.forEach(part => part.messages = []);
      this.participants = data;
    });
    this.socket.chatLogin$.subscribe(data => {
      data.messages = [];
      //Remove the previous participant if he was connected before
      let participant = this.participants.find(part => part.authId === data.authId);
      const index: number = this.participants.indexOf(participant);
      this.participants.splice(index, 1);
      this.participants.push(data);
    });
    this.socket.chatLogout$.subscribe(data => {
      let participant = this.participants.find(part => part.authId === data.authId);
      if(!isNullOrUndefined(participant))
        participant.sessionId = null;
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
      console.log("Receiving: ", msg);
      let participant = this.participants.find(part => part.username === msg.from);
      if(!isNullOrUndefined(participant)) {
        participant.hasUnreadMessages = true;
        participant.messages.push(msg);
      }
      participant = this.participants.find(part => part.username === msg.to);
      if(!isNullOrUndefined(participant)) {
        participant.messages.push(msg);
      }
    });
  }

  onParticipantSelectedEvent(participant: any) {
    participant.hasUnreadMessages = false;
    this.selectedParticipant = participant;
  }
}
