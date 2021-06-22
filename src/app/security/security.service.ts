import { Subject } from 'rxjs';

import { User } from './user.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class SecurityService{
  securityChange = new Subject<boolean>();
  private user : User;

  constructor(private router: Router){

  }

  registerUser(usr: User){
    this.user = {
      email: usr.email,
      userId: Math.round(Math.random()*10000).toString(),
      firstName: usr.firstName,
      lastName: usr.lastName,
      userName: usr.userName,
      password: ''
    };
    this.securityChange.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: LoginData){
    this.user = {
      email: loginData.email,
      userId: Math.round(Math.random()*10000).toString(),
      lastName: '',
      firstName: '',
      userName: '',
      password: ''
    };
    this.securityChange.next(true);
    this.router.navigate(['/']);
  }

  logout(){
    this.user = null;
    this.securityChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    return {...this.user}
  }

  onSession(){
    return this.user != null;
  }
}
