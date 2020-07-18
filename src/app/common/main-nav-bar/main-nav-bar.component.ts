import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuth } from '../entities/user-auth';
import { AuthenticationRouterService } from '../services/authentication-router.service';
import { RouterService } from 'src/app/financial/services/router.service';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})

export class MainNavBarComponent implements OnInit {

  public isMenuActive = false;

  public loggedUser;

  public isOnline;

  constructor(private authenticationRouterService: AuthenticationRouterService,
              private routerService: RouterService,
              private router: Router) { }

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

  public logout(): void {
    this.authenticationRouterService.logout();
  }

  public connect(): void {
    this.authenticationRouterService.connect();
    this.routerService.sync();
    this.ngOnInit();
  }

  public disconnect(): void {
    this.authenticationRouterService.disconnect();
    this.ngOnInit();
  }

  ngOnInit() {
    const user: UserAuth = this.authenticationRouterService.getCurrentUserValue();
    this.loggedUser = user.login;
    this.isOnline = this.authenticationRouterService.isOnline();
  }

}
