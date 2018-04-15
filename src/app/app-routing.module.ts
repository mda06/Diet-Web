import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {BlacklistComponent} from "./blacklist/blacklist.component";

const routes: Routes = [
  {path: 'maintenance', component: MaintenanceComponent},
  {path: 'blacklist', component: BlacklistComponent},
  //{path: '**', redirectTo:"/login"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
