import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  onClickSignUp() {
    this.router.navigate(['/signup']);
  }

  jumpToFooter() {
    window.location.hash = 'footer';
  }

}
