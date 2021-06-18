import { Component, Input, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  @Input() menuToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseMenu(){
    this.menuToggle.emit();
  }

}
