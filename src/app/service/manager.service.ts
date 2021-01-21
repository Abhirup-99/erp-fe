import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private httpClient: HttpClient) { }
    updateEmployeeData(data: any): Observable<any>{
        const url = `${environment.url}manager/update-employee-data`;
        return this.httpClient.post(url,data);
    }

    getJuniorEmployees(data: any): Observable<any>{
        const url = `${environment.url}manager/get-jr-employees`;
        return this.httpClient.post(url,data);
    }

    getJuniorManagers(data: any): Observable<any>{
        const url = `${environment.url}manager/get-jr-managers`;
        return this.httpClient.post(url,data);
    }

    getUnassignedEmployees(data: any): Observable<any>{
        const url = `${environment.url}manager/get-unassigned-employees`;
        return this.httpClient.post(url,data);
    }

    getEmployeeRequests(requestType: string, markedAs: string): Observable<any>{
        const url = `${environment.url}manager/get/${requestType}/${markedAs}`;
        return this.httpClient.get(url);
    }

    markEmployeeRequests(data: any): Observable<any>{
        const url = `${environment.url}manager/mark/`;
        return this.httpClient.post(url,data);
    }
}
