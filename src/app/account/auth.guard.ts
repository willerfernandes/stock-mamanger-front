import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FakeService } from 'src/app/services/fake.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private fakeService: FakeService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.fakeService.currentUserValue;
        console.log('Checking user authorization...');
        if (currentUser) {
            // logged in so return true
            console.log('Authorized!');
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.error('User not logged! Please sing in!');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
  }
