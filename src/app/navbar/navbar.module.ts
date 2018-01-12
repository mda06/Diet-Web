import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
