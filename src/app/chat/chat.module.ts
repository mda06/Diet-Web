import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {ChatRoutingModule} from "./chat-routing.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
