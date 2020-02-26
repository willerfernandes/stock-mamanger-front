import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('That was an error...');
      console.log(err);
      if (err.status === 401) {
        const error = err.message || err.statusText;
        console.log('Do something with unauthorized error...');
        this.authenticationService.logout();
        window.alert('Não autorizado!' + error);
      }
      return throwError(err);
    }));
  }
}
