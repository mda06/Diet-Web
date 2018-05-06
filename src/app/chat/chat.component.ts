import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from './service/socket.service';
import {isNullOrUndefined} from "util";
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  title = 'WebSockets chat';

  participants: Array<any> = [];
  message: string = "";
  username: string = "Incognito";

  selectedParticipant: any;
  private subscriptions = new Subscription();

  constructor(public socket: SocketService,
              private authService: AuthenticationService){
  }

  ngOnInit() {
    console.log("We are creating the chat: " + this.socket.isConnected());
    //If we go back to the chat
    /*if(this.socket.isConnected()) {
      console.log("Already connected");
      console.log(this.subscriptions);
      console.log(this.participants);
      this.handleSubscribes();
      console.log(this.participants);
      console.log(this.subscriptions);
      console.log("----------------");
    }*/

    this.subscriptions.add(this.authService.getConnectedUser().subscribe(
      user => {
        console.log("User");
        this.username = user.firstName + " " + user.lastName;
      },
      err => {console.log("Error trying to get the connected user");}
    ));
  }

  initializeWebSocketConnection() {
    this.socket.connect(this.username);
    this.handleSubscribes();
  }

  private handleSubscribes() {
    this.handleParticipants();
    this.handleMessages();
  }

  private handleParticipants() {
    this.subscriptions.add(this.socket.participants$.subscribe(data => {
      console.log("Participants");
      console.log(data);
      data.forEach(part => part.messages = []);
      this.participants = data;
    }));
    this.subscriptions.add(this.socket.chatLogin$.subscribe(data => {
      console.log("Chat login");
      console.log(data);
      data.messages = [];
      this.participants.push(data);
    }));
    this.subscriptions.add(this.socket.chatLogout$.subscribe(data => {
      console.log("Chat logout");
      console.log(data);
      const index: number = this.participants.indexOf(data);
      this.participants.splice(index, 1);
    }));
  }

  private handleMessages() {
    this.subscriptions.add(this.socket.publicMessage$.subscribe(data => {
      console.log("Public msg");
      console.log(data);
      this.participants.forEach(part => {
        part.hasUnreadMessages = true;
        part.messages.push({to: 'All', from: 'System', message: data});
      });
    }));
    this.subscriptions.add(this.socket.privateMessage$.subscribe(msg => {
      console.log("Private msg");
      console.log(msg);
      console.log("With participants: ");
      console.log(this.participants);
      let participant = this.participants.find(part => part.userName === msg.from);
      if(!isNullOrUndefined(participant)) {
        participant.hasUnreadMessages = true;
        participant.messages.push(msg);
      }
      participant = this.participants.find(part => part.userName === msg.to);
      if(!isNullOrUndefined(participant)) {
        participant.messages.push(msg);
      }
    }));
  }

  onParticipantSelectedEvent(participant: any) {
    participant.hasUnreadMessages = false;
    this.selectedParticipant = participant;
  }

  onSendMessage(){
    this.socket.sendPublicMessage(this.message);
    this.message = "";
  }

  ngOnDestroy(): void {
    console.log("Closing the subscripitions");
    console.log(this.subscriptions);
    //this.subscriptions.unsubscribe();
    console.log(this.subscriptions);
  }
}
