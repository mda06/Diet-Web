import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaintenanceComponent} from './maintenance/maintenance.component';

const routes: Routes = [
  {path: 'maintenance', component: MaintenanceComponent},
  {path: '**', redirectTo:"/login"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
