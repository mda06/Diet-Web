import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatParticipant} from '../../model/chatparticipant';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  @Input() participants: Array<ChatParticipant> = [];
  @Output() onParticipantSelected = new EventEmitter<any>();
  selectedParticipant: ChatParticipant = null;

  constructor() { }

  ngOnInit() {
  }

  onParticipantSelectedClicked(participant: any) {
    this.selectedParticipant = participant;
    this.onParticipantSelected.emit(participant);
  }
}
