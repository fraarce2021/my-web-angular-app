import { Subject } from 'rxjs';

import { User } from './user.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SecurityService{
  private token: string;
  baseUrl = environment.baseUrl;

  securityChange = new Subject<boolean>();
  private user : User;

  loadUser():void{
    const tokenBrowser = localStorage.getItem('token');
    if(!tokenBrowser){
      return;
    }
    this.token = tokenBrowser;
    this.securityChange.next(true);
    this.http.get<User>(this.baseUrl+'User')
    .subscribe((response)=>{
      console.log('loginresponse',response);
      this.token = response.token;
      this.user = {
        userId: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        userName: response.userName,
        email: response.email,
        password: '',
        token: response.token,
      };
    this.securityChange.next(true);
    localStorage.setItem('token', response.token);
    });

  }

  getToken(): string{
    return this.token;
  }

  constructor(private router: Router, private http:HttpClient){

  }

  registerUser(usr: User):void{
    this.http.post<User>(this.baseUrl+'User/register', usr)
    .subscribe((response)=>{
      this.token = response.token;
      this.user = {
        userId: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        userName: response.userName,
        email: response.email,
        password: '',
        token: response.token,
      };
    this.securityChange.next(true);
    localStorage.setItem('token', response.token);
    this.router.navigate(['/']);
    });
  }

  login(loginData: LoginData): void{
    this.http.post<User>(this.baseUrl+'User/login', loginData)
    .subscribe((response)=>{
      console.log('loginresponse',response);
      this.token = response.token;
      this.user = {
        userId: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        userName: response.userName,
        email: response.email,
        password: '',
        token: response.token,
      };
    this.securityChange.next(true);
    localStorage.setItem('token', response.token);
    this.router.navigate(['/']);
    });
  }

  logout(){
    this.user = null;
    this.securityChange.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser(){
    return {...this.user}
  }

  onSession(){
    return this.token != null;
  }
}
