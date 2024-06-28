import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public showSignUp: boolean = false;
  public showLogIn: boolean = true;
  public showMainPage: boolean = true;
  public authStatus : boolean = false;
  private numberOfChage: Number = 2;
  @ViewChild('adminBtn__text') private adminBtnTittle!: ElementRef;

  ngOnInit() {
    window.addEventListener('beforeunload', this.clearJwtToken);
  }

  clearJwtToken() {
    localStorage.removeItem('authToken');
  }

  public changeLoginAndMainField() {
    console.log(localStorage.getItem('authToken'));
    switch (this.numberOfChage) {
      case 1: this.adminBtnTittle.nativeElement.textContent = 'Staff Entry';
        this.numberOfChage = 2;
        this.showMainPage = true; 
        break;
      case 2: this.adminBtnTittle.nativeElement.textContent = 'Main Field';
        this.numberOfChage = 1;
        this.showMainPage = false; 
        break;
    }
  }
}
