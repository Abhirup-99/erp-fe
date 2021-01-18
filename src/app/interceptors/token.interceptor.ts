import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';public auth: AuthService ${this.auth.getToken()}
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    const headers: any = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: token
    };
    if(request.method === 'POST'){
      headers['Content-Type'] = 'application/json';
    }
    request = request.clone({
      setHeaders: headers,
      withCredentials: true
    });
    console.log(request);
    return next.handle(request);
  }
}
