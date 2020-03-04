import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-button-primary-icon',
  templateUrl: './button-primary-icon.component.html',
  styleUrls: ['./button-primary-icon.component.css']
})
export class ButtonPrimaryIconComponent implements OnInit {

  constructor() { }

  @Input()
  public imageUrl: string;

  @Output()
  public clickedEvent = new EventEmitter();

  click() {
    this.clickedEvent.emit();
  }

  ngOnInit() {
  }

}
