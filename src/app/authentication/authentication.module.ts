import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserAuthenticationService } from './user-authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignUpComponent,
    LogInComponent
  ],
  providers: [
    UserAuthenticationService
  ]
})
export class AuthenticationModule { }