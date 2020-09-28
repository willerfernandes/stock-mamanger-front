import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuth } from '../entities/user-auth';
import { AuthenticationService } from '../services/authentication.service';
import { FinancialService } from 'src/app/financial/services/financial.service';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})

export class MainNavBarComponent implements OnInit {

  public isMenuActive = false;

  public loggedUser;

  public isOnline;

  constructor(private authenticationService: AuthenticationService,
              private financialService: FinancialService,
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

  public navigateToRecurrentyEntryView(): void {
    this.router.navigate(['/recurrent-entries']);
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public connect(): void {
    this.authenticationService.connect();
    this.financialService.sync(false);
    this.ngOnInit();
  }

  public disconnect(): void {
    this.authenticationService.disconnect();
    this.ngOnInit();
  }

  ngOnInit() {
    const user: UserAuth = this.authenticationService.getCurrentUserValue();
    this.loggedUser = user.login;
    this.isOnline = this.authenticationService.isOnline();
  }

}
