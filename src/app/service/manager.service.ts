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

    getJuniorEmployees(): Observable<any>{
        const url = `${environment.url}manager/get-jr-employees`;
        return this.httpClient.get(url);
    }

    getJuniorManagers(): Observable<any>{
        const url = `${environment.url}manager/get-jr-managers`;
        return this.httpClient.get(url);
    }

    getUnassignedEmployees(): Observable<any>{
        const url = `${environment.url}manager/get-unassigned-employees`;
        return this.httpClient.get(url);
    }

    getEmployeeRequests(requestType: string, markedAs: string): Observable<any>{
        const url = `${environment.url}manager/get/${requestType}/${markedAs}`;
        return this.httpClient.get(url);
    }

    markEmployeeRequests(data: any): Observable<any>{
        const url = `${environment.url}manager/mark/`;
        return this.httpClient.post(url,data);
    }

    addManager(employeeId: string,managerId: string): Observable<any>{
        const url= `${environment.url}manager/${employeeId}/add-manager/${managerId}`;
        return this.httpClient.get(url);
    }

    removeManager(employeeId: string, managerId: string): Observable<any>{
        const url = `${environment.url}manager/${employeeId}/add-manager/${managerId}`;
        return this.httpClient.get(url);
    }

}
