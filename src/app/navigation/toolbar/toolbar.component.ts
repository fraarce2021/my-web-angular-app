import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();
  userStatus: boolean;
  userSuscription: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSuscription = this.securityService.securityChange.subscribe(status =>{
      this.userStatus = status;
    });
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  ngOnDestroy(){
    this.userSuscription.unsubscribe();
  }

  endSession(){
    this.securityService.logout();
  }
}
