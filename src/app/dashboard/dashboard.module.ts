import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, DashboardItemComponent],
  exports: [DashboardComponent, DashboardItemComponent],
})
export class DashboardModule { }
