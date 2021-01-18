/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpWithoutInterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpWithoutInterceptor.get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.httpWithoutInterceptor.put(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any = {}, options: any = {}): Observable<any> {
    options = {
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    };
    return this.httpWithoutInterceptor.post(
      `${path}`,
      JSON.stringify(body),
      options
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.httpWithoutInterceptor.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }


  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
