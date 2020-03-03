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
      console.log('Error calling api ' + request.urlWithParams + '...');
      const error = err.message || err.statusText;
      console.log(error);
      console.log(err);
      let message: string;
      if (err.status === 0) {
        message = 'Falha na tentativa de conectar ao servidor!';
      } else if (err.status === 401) {
        message = 'Não authorizado!';
        this.authenticationService.logout();
        window.alert('Unauthorized!' + ' ' + error);
      } else if (err.status === 500) {
        message = 'Houve um erro ao buscar as informações do servidor!';
      } else {
        message = 'Ops! Houve um erro =/';
      }
      this.authenticationService.openDialog(message);
      return throwError(err);
    }));
  }
}
