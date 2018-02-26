import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import { NgDragDropModule } from 'ng-drag-drop';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {DashboardModule} from '../dashboard/dashboard.module';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DashboardItemComponent} from '../dashboard/dashboard-item/dashboard-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    DashboardModule,
    NgDragDropModule.forRoot()
  ],
  providers: [TranslateService],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, TranslateModule, NgDragDropModule, DashboardComponent, DashboardItemComponent]
})
export class NavbarModule { }
