import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-primary-text',
  templateUrl: './button-primary-text.component.html',
  styleUrls: ['./button-primary-text.component.css']
})
export class ButtonPrimaryTextComponent implements OnInit {

  constructor() { }

  @Input()
  public text: string;

  @Output()
  public clickedEvent = new EventEmitter();

  click() {
    this.clickedEvent.emit();
  }

  ngOnInit() {
  }

}