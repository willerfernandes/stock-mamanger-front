import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})

export class MainNavBarComponent implements OnInit {

  public baseURL = 'http://localhost:4200/';
  public loginPath = this.baseURL + 'login';
  public stockDashboardPath = this.baseURL + 'stock-dashboard';
  public expenseDashboardPath = this.baseURL + 'expense-dashboard';
  public configPath = this.baseURL + 'config';
  public stockPath = this.baseURL + 'stock';
  public userPath = this.baseURL + 'user';
  public operationPath = this.baseURL + 'operation';
  public categoryPath = this.baseURL + 'category';


  constructor() { }

  ngOnInit() {

  }

}