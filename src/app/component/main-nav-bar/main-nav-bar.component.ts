import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/entities/user-auth';
import { RouterService } from 'src/app/services/router.service';

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


  public isMenuActive = false;

  public loggedUser;

  public isOnline;

  constructor(private routerService: RouterService, private router: Router) { }

  public toogleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  public navigateToHome(): void {
    this.router.navigate(['./home']);
  }

  public navigateToEntryClasses(): void {
    this.router.navigate(['/classes']);
  }

  public navigateToEntryListView(): void {
    this.router.navigate(['/entries']);
  }
x
  public logout(): void {
    this.routerService.logout();
  }

  public connect(): void {
    this.routerService.connect();
    this.ngOnInit();
  }

  public disconnect(): void {
    this.routerService.disconnect();
    this.ngOnInit();
  }

  ngOnInit() {
    const user: UserAuth = this.routerService.getCurrentUserValue();
    this.loggedUser = user.login;
    this.isOnline = this.routerService.isOnline();
  }

}
