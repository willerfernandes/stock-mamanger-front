import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router) { }


  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public imageUrl: string;

  @Input()
  clickUrl: string;


  onClick() {
    this.router.navigate([this.clickUrl]);
  }

  ngOnInit() {
  }

}
