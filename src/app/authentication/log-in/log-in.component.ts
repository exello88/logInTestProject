import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  public showMainPage : boolean = false;
  @Output() showLogInChange = new EventEmitter<boolean>();
  @Output() showSignUpChange = new EventEmitter<boolean>();
  @Output() authStatus = new EventEmitter<boolean>();
  @ViewChild('inputEmail') private inputEmailRef!: ElementRef;
  @ViewChild('inputPassword') private inputPasswordRef!: ElementRef;
  @ViewChild('errorField') private errorField!: ElementRef;

  constructor(private authService: UserAuthenticationService) { }

  public selectMod() {
    this.showLogInChange.emit(false);
    this.showSignUpChange.emit(true);
  }
  public async logIn() {
    let error = false;
    const email = this.inputEmailRef.nativeElement.value;
    const password = this.inputPasswordRef.nativeElement.value;
    try {
      await this.authService.loginUser(email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            error = true;
            this.inputEmailRef.nativeElement.style.border = '1px solid red';
            this.inputPasswordRef.nativeElement.style.border = '1px solid red';
            this.errorField.nativeElement.textContent = 'Неверный пароль или email.';
            break;
          case 'auth/invalid-email':
            error = true;
            this.inputPasswordRef.nativeElement.style.border = '0px';
            this.inputEmailRef.nativeElement.style.border = '1px solid red';
            this.errorField.nativeElement.textContent = 'Неверный формат электронного адреса.';
            break;
        }
      }
    }
    if (!!localStorage.getItem('authToken')){
      this.authStatus.emit(true);
      console.log('dssd');
    } 
  }
}

