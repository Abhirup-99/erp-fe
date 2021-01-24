import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BeService } from './be.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private auth: AngularFireAuth,private httpService: HttpService,
                private httpClient: HttpClient,private beService: BeService){}

    async login(email: string,password: string): Promise<void>{
        const result = await this.auth.signInWithEmailAndPassword(email,password);
        const url = `${environment.url}auth/sign-user`;
        const token = await result.user?.getIdToken();
        const res = await this.httpService.post(url,{idToken:token}).toPromise();
        localStorage.setItem('accessToken',res.user_details.access_token);
        const userData = await this.beService.getMyInfo().toPromise();
        localStorage.setItem('profile',JSON.stringify(userData.user_data));
        localStorage.setItem('isManger', userData.user_data.is_manager);
    }
    sendEmailVerification(currentUser: firebase.User) {

        return currentUser.sendEmailVerification();
    }
    async signup(email: string,password: string): Promise<void>{
        const result = await this.auth.createUserWithEmailAndPassword(email,password);
        const user = (result.user) as firebase.User;
        await this.sendEmailVerification(user);
        const token = await user.getIdToken();
        const url = `${environment.url}auth/sign-user`;
        const res = await this.httpService.post(url,{idToken:token}).toPromise();
        localStorage.setItem('accessToken',res.user_details.access_token);
    }
    async logout(): Promise<void>{
        const url = `${environment.url}auth/sign-out`;
        await this.httpClient.get(url).toPromise();
        await this.auth.signOut();
    }
}
