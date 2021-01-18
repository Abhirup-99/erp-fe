/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private auth: AngularFireAuth,private httpService: HttpService){}

    async login(email: string,password: string): Promise<void>{
        const result = await this.auth.signInWithEmailAndPassword(email,password);
        const url = `${environment.url}auth/sign-user`;
        const token = await result.user?.getIdToken();
        this.httpService.post(url,{
            idToken:token
        }).subscribe((res)=>{
            localStorage.setItem('accessToken',res.accessToken);
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
            localStorage.setItem('accessToken',res.accessToken);
        },err=>{
            this.logout();
        });
    }
    logout(): Promise<void>{
        return this.auth.signOut();
    }
}
