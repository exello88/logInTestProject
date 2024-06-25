import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  @Output() showLogInChange = new EventEmitter<boolean>();
  @Output() showSignUpChange = new EventEmitter<boolean>();
  @ViewChild('inputEmail') private inputEmailRef!: ElementRef;
  @ViewChild('inputPassword') private inputPasswordRef!: ElementRef;
  @ViewChild('errorField') private errorField!: ElementRef;

  constructor(private authService: UserAuthenticationService) { }

  public selectMod() {
    this.showLogInChange.emit(false);
    this.showSignUpChange.emit(true);
  }
  public async logIn() {
    const email = this.inputEmailRef.nativeElement.value;
    const password = this.inputPasswordRef.nativeElement.value;
    try {
      await this.authService.loginUser(email, password);
    } catch (error: unknown) {//Тут я уже не знаю что использовать, потому что оно ничего кроме any и unknow ничего не присваивает
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            this.inputEmailRef.nativeElement.style.border = '1px solid red';
            this.inputPasswordRef.nativeElement.style.border = '1px solid red';
            this.errorField.nativeElement.textContent = 'Неверный пароль или email.';
            break;
          case 'auth/invalid-email':
            this.inputPasswordRef.nativeElement.style.border = '0px';
            this.inputEmailRef.nativeElement.style.border = '1px solid red';
            this.errorField.nativeElement.textContent = 'Неверный формат электронного адреса.';
            break;
        }
      }
    }
  }
}

