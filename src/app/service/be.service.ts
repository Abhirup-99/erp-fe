import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeeLoanRaise } from '../types/employee-loan-raise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeService {
  constructor(private httpClient: HttpClient) { }

  submitData(data: any): Observable<any> {
    const url = `${environment.url}auth/set-user-data`;
    return this.httpClient.post(url, data);
  }

  submitLeaveApplication(data: any): Observable<any> {
    const url = `${environment.url}employee/create-leave`;
    return this.httpClient.post(url, data);
  }

  getMyInfo(): Observable<any> {
    const url = `${environment.url}employee/info`;
    return this.httpClient.get(url);
  }

  getEmployeeData(type: string, marked: string): Observable<any> {
    const url = `${environment.url}employee/${type}/${marked}`;
    return this.httpClient.get(url);
  }

  employeeUpdateData(data: any): Observable<any> {
    const url = `${environment.url}employee/update-data`;
    return this.httpClient.post(url, data);
  }

  createEmployeeLeave(data: any): Observable<any> {
    const url = `${environment.url}employee/create-leave`;
    return this.httpClient.post(url, data);
  }

  createEmployeeLoanRaise(data: EmployeeLoanRaise): Observable<any> {
    const url = `${environment.url}employee/create-loan-raise-request`;
    return this.httpClient.post(url, data);
  }
  getManagerLeaveData(leaveType: string): Observable<any> {
    const url = `${environment.url}manager/leave`;
    let params = new HttpParams();
    params = params.append('leaveType', leaveType);
    return this.httpClient.get(url, {
      params
    });
  }
}
