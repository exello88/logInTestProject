import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() showLogInChange = new EventEmitter<boolean>();
  @Output() showSignUpChange = new EventEmitter<boolean>();
  @ViewChild('inputEmail') private inputEmailRef!: ElementRef;
  @ViewChild('inputPassword') private inputPasswordRef!: ElementRef;
  @ViewChild('inputRepeatPassword') private inputRepeatPasswordRef!: ElementRef;
  @ViewChild('errorField') private errorField!: ElementRef;



  constructor(private authService: UserAuthenticationService) { }

  public selectMod() {
    this.showLogInChange.emit(true);
    this.showSignUpChange.emit(false);
  }
  public async signUp() {
    const email: string = this.inputEmailRef.nativeElement.value;
    const password: string = this.inputPasswordRef.nativeElement.value;
    const passwordRepeat: string = this.inputRepeatPasswordRef.nativeElement.value;
    if (password === passwordRepeat) {
      try {
        await this.authService.registerUser(email, password);
      } catch (error: unknown) { //Тут я уже не знаю что использовать, потому что оно ничего кроме any и unknow ничего не присваивает
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.inputPasswordRef.nativeElement.style.border = '0px';
              this.inputRepeatPasswordRef.nativeElement.style.border = '0px';
              this.inputEmailRef.nativeElement.style.border = '1px solid red';
              this.errorField.nativeElement.textContent = 'Этот электронный адрес уже используется.';
              break;
            case 'auth/weak-password':
              this.inputEmailRef.nativeElement.style.border = '0px';
              this.inputPasswordRef.nativeElement.style.border = '1px solid red';
              this.inputRepeatPasswordRef.nativeElement.style.border = '1px solid red';
              this.errorField.nativeElement.textContent = 'Пароль должен быть не менее 6 символов.';
              break;
            case 'auth/invalid-email':
              this.inputPasswordRef.nativeElement.style.border = '0px';
              this.inputRepeatPasswordRef.nativeElement.style.border = '0px';
              this.inputEmailRef.nativeElement.style.border = '1px solid red';
              this.errorField.nativeElement.textContent = 'Неверный формат электронного адреса.';
              break;
          }
        } 
      }
    } else {
      this.inputEmailRef.nativeElement.style.border = '0px';
      this.inputPasswordRef.nativeElement.style.border = '0px';
      this.inputRepeatPasswordRef.nativeElement.style.border = '1px solid red';
      this.errorField.nativeElement.textContent = 'Пароли не совпадают.';
    }
  }
}