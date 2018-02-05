import { NgModule }       from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {NavbarModule} from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoginRoutingModule,
    NavbarModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  exports: []
})
export class LoginModule {}
