import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeService {
    constructor(private httpClient: HttpClient){}

    submitData(data: any){
        const url = `${environment.url}auth/set-user-data`;
        return this.httpClient.post(url,data);
    }

    submitLeaveApplication(data: any){
      const url = `${environment.url}employee/create-leave`;
      return this.httpClient.post(url,data);
    }

    getMyInfo(){
      const url = `${environment.url}employee/info`;
      return this.httpClient.get(url);
    }

    getLeaveData(leaveType: string){
      const url = `${environment.url}employee/leave/`;
      let params = new HttpParams();
      params = params.append('leaveType',leaveType);
      return this.httpClient.get(url,{
        params
      });
    }

    getManagerLeaveData(leaveType: string){
      const url = `${environment.url}manager/leave`;
      let params = new HttpParams();
      params = params.append('leaveType',leaveType);
      return this.httpClient.get(url,{
        params
      });
    }
}
