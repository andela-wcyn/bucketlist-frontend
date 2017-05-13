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
    private messages: Array<string> = [];
    private _loginUrl = 'http://127.0.0.1:5000/api/v1/auth/login/'
    private _registrationUrl = 'http://127.0.0.1:5000/api/v1/auth/register/'
    // createAuthorizationHeader(headers: Headers) {
    //     headers.append('Authorization', 'JWT ' +
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNDk0NDIwOTI5LCJpYXQiOjE0OTQzOTA5MjksIm5iZiI6MTQ5NDM5MDkyOX0.MzCiFAmVRu5btXqzI0kJIkCsV5qjmkuYph9FS-FMZIE"); 
    // }

    constructor(private _http: Http,
              private authHttp: AuthHttp) {}

    // logIn(): Observable<any> {
    //     let headers = new Headers();
    //     this.createAuthorizationHeader(headers);
    //     return this._http.get(this._loginUrl, {headers: headers})
    //                 .map((response: Response) => <any>response.json().data[0])
    //                 .do(data=> console.log('All: ' + JSON.stringify(data)))
    //                 .catch(this.handleError);
    // }
    
    // send username/email and password and get the token
    logIn(password: string, username?: string, email?: string): Observable<any> {
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
            .post(APP_SERVER + 'auth/login',
            JSON.stringify(user_data),
            options)
            .map((response: Response) => response.json())
            .do(data=> console.log('USer Data: ' + JSON.stringify(data)))
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
            .do(data=> console.log('Register Data: ' + JSON.stringify(data)))
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