import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-on-screen',
  templateUrl: './alert-on-screen.component.html',
  styleUrls: ['./alert-on-screen.component.css']
})
export class AlertOnScreenComponent implements OnInit {

  public dismissed = false;


  @Input()
  public title: string;

  @Input()
  public message: string;

  constructor() { }

  dismiss() {
    this.dismissed = true;
  }

  ngOnInit() {
  }

}
