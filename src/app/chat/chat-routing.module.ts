import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./chat.component";

const ROUTES: Routes = [
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }
