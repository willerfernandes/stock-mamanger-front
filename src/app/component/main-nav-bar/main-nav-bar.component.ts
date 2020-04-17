import { Component, OnInit, Input } from '@angular/core';
import { FakeService } from 'src/app/services/fake.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuth } from 'src/app/entities/user-auth';

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

  constructor(private authService: AuthenticationService, private router: Router, private fakeService: FakeService) { }

  public toogleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  public navigateToHome(): void {
    this.router.navigate(['./home']);
  }

  public logout(): void {
    this.fakeService.logout();
  }

  ngOnInit() {
    const user: UserAuth = this.fakeService.currentUserValue;
    this.loggedUser = user.login;
  }

}
