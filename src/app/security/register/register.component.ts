import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService : SecurityService) { }

  ngOnInit(): void {
  }

  registerUser(form:NgForm){
    this.securityService.registerUser({
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      userName: form.value.userName,
      userId: '',
      token: ''
    });
  }
}
