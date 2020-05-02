import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // console.log('Requesting: ' + request.urlWithParams + '...');
        // console.log(request);
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'security-token': `${currentUser.token}`
                }
            });
        }

        const requestHadling = next.handle(request);

        // log response - calling endpoint again - should be fixed to log reponses
        // console.log('Reponse from ' + request.urlWithParams);
        // requestHadling.subscribe( res => console.log(res));
        return requestHadling;
    }
}
