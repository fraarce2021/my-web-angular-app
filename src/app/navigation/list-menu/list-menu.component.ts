import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  userStatus: boolean;
  userSuscription: Subscription;

  constructor(private securityService : SecurityService) { }

  ngOnInit(): void {
    this.userSuscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status;
    })
  }

  onCloseMenu(){
    console.log(this.menuToggle)
    this.menuToggle.emit();
    console.log(this.menuToggle)
  }

  logoutSessionMenu(){
    this.onCloseMenu();
    this.securityService.logout();
  }

  ngOnDestroy(){
    this.userSuscription.unsubscribe();
  }
}
