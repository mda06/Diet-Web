import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SocketService} from '../service/socket.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  @Input() participants: Array<any> = [];
  @Output() onParticipantSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onParticipantSelectedClicked(participant: any) {
    console.log(participant.userName + " has been selected");
    this.onParticipantSelected.emit(participant);
  }
}
