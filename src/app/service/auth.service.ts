import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private auth: AngularFireAuth,private httpService: HttpService,
                private httpClient: HttpClient){}

    async login(email: string,password: string): Promise<void>{
        const result = await this.auth.signInWithEmailAndPassword(email,password);
        const url = `${environment.url}auth/sign-user`;
        const token = await result.user?.getIdToken();
        this.httpService.post(url,{
            idToken:token
        }).subscribe((res)=>{
            localStorage.setItem('accessToken',res.user_details.access_token);
        },err=>{
            this.logout();
        });

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
        this.httpService.post(url,{
            idToken:token
        }).subscribe((res)=>{
            localStorage.setItem('accessToken',res.user_details.access_token);
        },err=>{
            this.logout();
        });
    }
    async logout(): Promise<void>{
        const url = `${environment.url}auth/sign-out`;
        await this.httpClient.get(url).toPromise();
        await this.auth.signOut();
    }
}
