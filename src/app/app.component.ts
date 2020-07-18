import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  title = 'ADMoney';

  constructor(private activeRouter: Router, private titleService: Title) {}

  url;

  ngOnInit() {
    this.url = this.activeRouter.url;
    this.titleService.setTitle(this.title);
  }

}
