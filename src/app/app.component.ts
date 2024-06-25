import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public showSignUp : boolean = false;
  public showLogIn : boolean = true;
}
