import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import { NgDragDropModule } from 'ng-drag-drop';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    NgDragDropModule.forRoot()
  ],
  providers: [TranslateService],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, TranslateModule, NgDragDropModule]
})
export class NavbarModule { }
