import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OnlineAuthenticationService } from 'src/app/common/services/online-authentication.service';
import { MessageService } from 'src/app/common/services/message.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: OnlineAuthenticationService,
              private router: Router,
              private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let message: string;
      if (err.status === 0) {
        message = 'Falha na tentativa de conectar ao servidor!';
      } else if (err.status === 401) {
        if (request.method === 'login') {
          message = 'Login ou senha incorretos';
        } else {
          message = 'Sua sessão expirou! Favor realizar o login novamente';
          this.authenticationService.logout();
          this.messageService.openMessageBar(message, null);
          this.router.navigate(['/login']);
        }
      } else if (err.status === 500) {
        message = 'Houve um erro ao buscar as informações do servidor!';
      } else {
        message = 'Ops! Houve um erro =/';
      }
      this.messageService.openMessageBar(message, null);
      return throwError(err);
    }));
  }
}
