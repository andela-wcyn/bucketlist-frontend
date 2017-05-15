import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { APP_SERVER } from "../shared/shared.module";



@Injectable()
export class UserService {

    constructor(private _http: Http) {}
    
    // send username/email and password and get the token
    logIn( password: string, username: string): Observable<any> {
        let options: RequestOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
        });
        let user_data = {
            "password": password,
            "username": username
        };

        return this._http
            .post(APP_SERVER + 'auth/login',
            JSON.stringify(user_data),
            options)
            .map((response: Response) => response.json())
            .do(data=> console.log('User data retrieved'))
            .catch(this.handleError);
    }

    // send user details and create user
    registerUser(password: string, username?: string, email?: string): Observable<any> {
        let options: RequestOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
        });
        let user_data = {
            "password": password
        };
        if (username) {
            user_data["username"] = username;
        }
        if (email) {
            user_data["email"] = email;
        }
        return this._http
            .post(APP_SERVER + 'auth/register',
            JSON.stringify(user_data),
            options)
            .map((response: Response) => response.json())
            .do(data=> console.log('Registered'))
            .catch(this.handleError);
    }

    getLoggedInUser(){
        let token = localStorage.getItem('token');
        let jwtHelper: JwtHelper = new JwtHelper();
        return `decoded: ${JSON.stringify(jwtHelper.decodeToken(token))}`;              
    }


    private handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}