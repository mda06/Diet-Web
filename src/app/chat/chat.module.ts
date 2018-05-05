import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {ChatRoutingModule} from "./chat-routing.module";
import {FormsModule} from "@angular/forms";
import { ParticipantsComponent } from './participants/participants.component';
import { MessageComponent } from './message/message.component';
import {SocketService} from './service/socket.service';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  exports: [
    ChatComponent
  ],
  declarations: [ChatComponent, ParticipantsComponent, MessageComponent],
  providers: [SocketService]
})
export class ChatModule { }
