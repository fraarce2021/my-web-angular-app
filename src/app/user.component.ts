import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent{
  users = ['Lu8is','Nicole','Karla'];
  userName = '';
  visible = false;

  constructor(){
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }

  onAddUser(){
    this.users.push(this.userName);
    this.userName = '';
  }



}

